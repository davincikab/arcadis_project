mapboxgl.accessToken = 'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: {lng: 13.65614561700636, lat: 54.82135678178332},
    zoom: 11.5
});

var excelUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0BWu7Gmy6jh1uTcxUD7J_vXVr4SORsSYJD3NPtPYOXpvIsdIbV0UbbpSYVGc2YpJjU7ExOpb0h4Pt/pub?output=xlsx";


map.on('load', function(e) {
    map.addSource('cables',{
        type:'geojson',
        data:{ "type":"FeatureCollection", "features":[] }
    });

    map.addLayer({
        id:'cable',
        source:'cables',
        type:'line',
        paint:{
            'line-width':3,
            'line-color':['get', 'color']
        }
    });

    // turbine names
    map.addSource('turbines',{
        type:'geojson',
        data:turbineLocations
    });

    map.addLayer({
        id:'turbine',
        source:'turbines',
        type:'symbol',
        paint:{
            
        },
        layout:{
            'text-field':['get', 'Name'],
            'text-justify':'center',
            'text-offset':[0, 3],
            'text-size':10
        }
    });

});


class WindFarmVisual {
    constructor(map, turbineLocations) {
        this.map = map;
        this.turbineLocations = [];
        this.activeVisual = 'progress';
    }

    loadData() {
        fetch(excelUrl)
            .then(res => res.arrayBuffer())
            .then(arrBuf => {
                // var dataInt = new Uint8Array(arrBuf);
                var workbook = XLSX.read(arrBuf, {type:"binary", cellDates: true, dateNF:"dd/mm/yy"});

                this.sheets = this.processWorkbook(workbook);

                // add the info
                this.turbineLocations = this.getTurbineFeatures(this.sheets);
                // this.encrichData(this.sheets);

                this.renderTurbineOnMap();
                this.createCables(this.sheets);
                this.renderBarChart(this.sheets);

                this.renderProgressLegend();
                this.renderCableProgress();

                this.fireClickListeners()
            })
            .catch(console.error);

        
        return this;
    }

    processWorkbook(workbook) {
        let sheetsNames = [...workbook.SheetNames];
        let sheets = {};
    
        sheetsNames.forEach(sheetName => {
            sheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {cellDates:true, dateNF:"dd/mm/yy"});
        });
    
        return sheets;
    }

    getTurbineFeatures(sheets) {
        return sheets['FOU Termination Progress'].map(ft => {
            return {
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[parseFloat(ft.Long), parseFloat(ft.Lat)]
                },
                properties:{
                    ...ft
                }
            }
        });
    }

    encrichData(sheets) {
        // console.
        let terminationProgress = sheets['FOU Termination Progress'];

        this.turbineLocations = this.turbineLocations.map(ft => {
            let entry = terminationProgress.find(dt => dt.Location == ft.properties.Name);

            ft.properties.progress = entry ? {...entry} : {};

            return ft;
        });

    }

    createCables(sheets) {
        // turbine locations
        let locations = this.turbineLocations.map(location => {
            return {
                name:location.properties.Location,
                coordinates:[...location.geometry.coordinates]
            };

        });

        let cables = sheets['Cable Progress'];

        this.cables = cables.map(cable => {
            // let [from, to] = cable.Cable.split("-");

            let toEntry = locations.find(lc => lc.name == cable['End A']);
            let fromEntry = locations.find(lc => lc.name == cable['End B']);


            if(toEntry && fromEntry) {
                cable.coords = [fromEntry.coordinates, toEntry.coordinates]
            }
            
            return cable;
        }).filter(cable => cable.coords);

        // features
        let cableGeojson = { "type":"FeatureCollection", "features":[] };
        cableGeojson.features = this.cables.map(cable => {
            let color;

            if(cable['OTDR tested'] && cable['SAT tested']) {
                color = '#00FF00';
            }else if(cable['OTDR tested']) { 
                color = '#FFFF00' 
            } else if(cable['SAT tested']) {
                color = '#b3b300';
            } else {
                color = "#000"
            }

            return {
                "type":"Feature",
                "geometry":{"type":"LineString", "coordinates":[...cable.coords]},
                "properties":{...cable, color}
            }
        });

        this.updateSourceCables(cableGeojson);
    }


    updateSourceCables(cableJson) {
        let cableTestColors = {
            "Cable Laid":"#000000",
            "HV Resonance tested":"#FFC000",
            "OTDR tested":"#FF0000",
            "Pre-tested":"#00B0F0",
        }

        this.map.getSource('cables').setData(cableJson);
    }

    createIconMarker() {

    }

    createPieMarker(feature) {

        let { geometry, properties } = feature;
            
        let data;
        if(properties.Location == 'OSS') { 
            let keys = [
                'Custody', 'Hang Off Complete', 'FO Works Complete', 'HV Works Complete', 
                'QC Walkdown Complete', 'Out Survey'
            ];

            let valueData  = this.sheets['Z01 Array Termination Progress'].map(dt => {
                let values = keys.filter(key => dt[key]);
                let value = (values.length/keys.length) * 100;

                return value;
            }).reduce((a,b) => a + b, 0);

            let completValue = valueData/this.sheets['Z01 Array Termination Progress'].length;
            let incompleteValue = 100 - parseInt(completValue);

            data = [
                { label:"Incomplete", status:true, value:incompleteValue, color:'transparent'},
                { label:"Complete", status:true, value:completValue, color:'rgb(125, 181, 88)'}
            ];

        } else {
            data = [
                { label:"In Survey", status:properties["In Survey"], value:1, color:'#4285F4'},
                { label:"Hang Off Complete", status:properties["Hang Off Complete"], value:1, color:'#EA4335'},
                { label:"FO Works Complete", status:properties["FO Works Complete"], value:1, color:'#FBBC04'},
                { label:"HV Works Complete", status:properties["HV Works Complete"], value:1, color:'#34A853'},
                { label:"QC Walkdown Complete", status:properties["QC Walkdown Complete"], value:1, color:'#FF6D01'},
                { label:"Out Survey", status:properties["Out Survey"], value:1, color:'#46BDC6'}
            ];
        }
        
        
        let element = new PieMarkerElement(data, feature.properties.Location);

        // popup
        let popupKeys = Object.keys(feature.properties).filter(key => key != "label");
        let popupEntryString = popupKeys.map(key => {
            // format date
            let value = feature.properties[key];
            // console.log(value);

            if(value instanceof Date) {
                // console.log(value.getDate());
                value = this.formatDate(value);
            }

            return `<div class='popup-entry'>${key}<b>${value}</b></div>`;
        }).join('');

        var popupDiv = "<div class='popup-content'>" + 
            "<div class='popup-title'><strong>" + feature.properties.Location +"</strong></div>" +
           popupEntryString +
        "</div>";

    
        var popup = new mapboxgl.Popup({focusAfterOpen:false, offset:15})
                    .setHTML(popupDiv)
                    .setMaxWidth("250px");

        let div = document.createElement("div");
        div.classList.add("div-marker");

        if(feature.properties.Custody) {
            div.classList.add('in-custody')
        }

        div.innerHTML = element.getSvg();

        let marker = new mapboxgl.Marker({
            element:div
        })
        .setLngLat(geometry.coordinates)
        .setPopup(popup);

        marker.properties = {...feature.properties};


        return marker;           
        
    }

    formatDate(date) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

    renderCableProgress() {
        // let cableTestColors = {
        //     "Cable Laid":"#000000",
        //     "HV Resonance tested":"#FFC000",
        //     "OTDR tested":"#FF0000",
        //     "Pre-tested":"#00B0F0",
        // };
        let cableTestColors = {
            "OTDR tested":"#FFFF00",
            "SAT tested":"#b3b300",
            "Fully Tested":"#00FF00"
        };

        let keys = Object.keys(cableTestColors);
        let cableTestSection = document.getElementById("cable-progress");

        keys.forEach(key => {
            let count = this.cables.filter(cable => cable[key]).length;

            let section = `<div class="progress-section">
                <div class="info">
                    <div class="progress-tracker" style="background-color:${cableTestColors[key]};"></div>
                    <span>${count} of ${this.cables.length} strings</span>
                </div>

                <div class="progress-card">${key}</div>
            </div>`;

            cableTestSection.innerHTML += section;
        });

    }

    renderProgressLegend(sheets) {
        let keys = [
            "Custody", 'In Survey', 'Hang Off Complete', 'FO Works Complete', 'HV Works Complete', 
            "QC Walkdown Complete", "Out Survey"
            // 'FOU Complete',  'Inspection (DIT) Complete', 'TOC To Construction', 'NCR Free'
        ];

        let legendSection = document.getElementById("pie-charts");

        keys.forEach(key => {
            let properties = {[key]:true};

            let data = [
                { label:"In Survey", status:properties["In Survey"], value:1, color:'#4285F4'},
                { label:"Hang Off Complete", status:properties["Hang Off Complete"], value:1, color:'#EA4335'},
                { label:"FO Works Complete", status:properties["FO Works Complete"], value:1, color:'#FBBC04'},
                { label:"HV Works Complete", status:properties["HV Works Complete"], value:1, color:'#34A853'},
                { label:"QC Walkdown Complete", status:properties["QC Walkdown Complete"], value:1, color:'#FF6D01'},
                { label:"Out Survey", status:properties["Out Survey"], value:1, color:'#46BDC6'}
            ];
            
            let element = new PieMarkerElement(data, key, true);

            // get the locations with 
            let locations = this.turbineLocations.filter(lt => lt.properties[key]);

            // append the legend on the 
            legendSection.innerHTML += `<div class="pie-item" id="${key.toLowerCase().split(" ").join("-")}" data-key="${key}">
                <div>${element.getSvg()}</div>
                <div class="more-info">
                    <b>${key}</b>
                    <div class="text-small">${locations.length} of ${this.turbineLocations.length} locations</div>
                </div>
            </div>`;
        });
        
    }


    renderTurbineOnMap() {
        this.markers = this.turbineLocations.map(location => {
            let marker = this.createPieMarker(location);

            marker.addTo(this.map);

            return marker;
        })
    }

    renderBarChart(sheets) {
        let zo1Progress = sheets['Z01 Array Termination Progress'];

        let keys = [
            'Custody', 'Hang Off Complete', 'FO Works Complete', 'HV Works Complete', 
            'QC Walkdown Complete', 'Out Survey'
            // 'FOU Complete', 'Inspection (DIT) Complete', 'TOC To Construction', 'NCR Free'
        ];

        let barData = zo1Progress.map(dt => {
            let values = keys.filter(key => dt[key]);
            let value = (values.length/keys.length) * 100
           
            let color = value == 100 ? '#7DB558' : '#ED7D31'

            return {
                name:dt.String,
                value:parseInt(value),
                color
            };
        });

        BarChart(barData);
    }

    toggleActiveCategory(key) {
        this.markers.forEach(marker => {
            if(marker.properties[key]) {
                marker.getElement().classList.add("active")
            } else {
                marker.getElement().classList.remove("active");
            }
        })
    }


    renderLocationOnDate(date) {
        // filter the dates
    }

    fireClickListeners() {
        let pieItems = document.querySelectorAll(".pie-item");
        this.activeCategory;

        pieItems.forEach(item => {
            item.onclick = e => {
                let { key } = e.target.dataset;
                pieItems.forEach(item => e.target != item ? item.classList.remove('active'): "");

                e.target.classList.toggle("active")

                if(this.activeCategory == key) {
                    this.toggleActiveCategory("");

                    this.activeCategory = "";
                } else {
                    this.toggleActiveCategory(key);
                    this.activeCategory = key;
                }
            }

        });

        document.getElementById("print-btn").onclick = (e) => {
            this.printPDF()
        }
    }

    printPDF() {
        this.dateSection = document.getElementById("date-section");

        let node = document.getElementById("map-container");
        let elementNode = document.getElementById("filter-section");
        elementNode.classList.toggle('d-none');
        // this.myImage = document.getElementById("my-image");

        
        this.dateSection.classList.toggle('d-none');
        html2canvas(node, {
            useCORS: true,
            logging: true,
            // allowTaint:false
        }).then(canvas => {
            console.log(canvas);
            this.myImage.src = canvas.toDataURL();
            this.myImage.style.transform = "rotate(90deg)";

            elementNode.classList.toggle('d-none');
            this.dateSection.innerHTML = this.formatDate(new Date());
            
            this.myImage.onload = (e) => {
                html2canvas(this.myImage, { useCORS: true, logging: true})
                .then(canvasContainer => {
                    console.log(canvasContainer.toDataURL());

                    createPdf(canvasContainer.toDataURL());

                    this.myImage.src = "#"
                    // this.dateSection.classList.toggle('d-none');
                });
            }
            


            // 
        });

        let pdfDocEl = document.getElementById('pdf');
        async function createPdf(imageBuffer) {
            console.log(imageBuffer);

            const pdfDoc = await PDFLib.PDFDocument.create();

            const pngImage = await pdfDoc.embedPng(imageBuffer);
            const pngDims = pngImage.scaleToFit(600, 780);

            console.log(pngDims);

            const page = pdfDoc.addPage();
            console.log(page.getWidth())

            page.drawImage(pngImage, {
                x: 120,
                y: 30,
                width: 400,
                height: pngDims.height,
            });

            // page.moveTo(130, 810);
            // page.drawText('Parkwind Status Tracker for Array Termination', {size:16});

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            // pdfDocEl.src = pdfDataUri;

            pdfDocEl.classList.toggle("d-none");

            var w = window.open("");
            w.document.write(`<style> body {margin:0; padding:0; }</style><iframe id="pdf" style="width: 100%; height: 100%;" src="${pdfDataUri}"></iframe>`);
        }

        // htmlToImage.toPng(node)
        // .then(function (dataUrl) {
        //     var img = new Image();
        //     img.src = dataUrl;

        //     document.body.appendChild(img);
        // })
        // .catch(function (error) {
        //     console.error('oops, something went wrong!', error);
        // });
    }
}


const windFarmVisual = new WindFarmVisual(map, turbineLocations.features);
map.once('load', () => {
    windFarmVisual
    .loadData()
    // .renderTurbineOnMap()
});

function PieMarkerElement(data, pointName, isLegend=false) { 
    // this.svg = d3.select(`svg#${pointName}`);
    this.height = 35;
    this.width = 35;
    this.svgId = pointName;
       
    this.radius = Math.min(this.width, this.height) / 2 - 2;
    
    var pie = d3.pie().value(function(d) { return d.value});
    this.pieData = pie(data);
    
    this.pieGenerator = d3.arc().innerRadius(0).outerRadius(this.radius);
    
    this.colors = {
        "Custody":"#CCFFCC",
        "Stripping/Hangoffs":"blue",
        "Routing & Cleating":"pink",
        "Termination (MV & Fibre)":"black",
        "SAT B":"greenyellow",
        "Walkdowns":"purple",
        "AREI":"brown",
        "SAT C":"skyblue"
    };
    
    this.paths = this.pieData.map(dt => this.pieGenerator(dt));
    
    this.getSvg = function() {
        let paths = this.paths.map((p,i) => `<path d="${p}" fill="${this.color(this.pieData[i])}" stroke="#fafafa" stroke-width=1></path>`);
    
        return `<svg height='${this.height}' width='${this.width}' id=${this.svgId}>"+
            <g transform='translate(${this.height/2}, ${this.height/2})'>"+
                ${paths.join()}
            </g>
        </svg>`;
    },
    
    this.color = function(node) {
        // if(isLegend) {
        //     return node.data.status ? node.data.color :'hsla(0, 0%, 23%, 0.2);';
        // } 
        return node.data.status ? node.data.color : "#75CFF0";
    }
}

function BarChart(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 0, right:40, bottom: 40, left: 40},
    width = 300 - margin.left - margin.right,
    height = 180 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    var svg = d3.select("#bar-progress")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([ 0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.name; }))
        .padding(.2);

    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", y.bandwidth() )
        .attr("fill", d => d.color);
    
    // add labels: values
    svg.selectAll('my-text')
        .data(data)
        .enter()
        .append('text')
        .attr("x", d=> x(d.value) + 5 )
        .attr("y", function(d) { return y(d.name) + 10; })
        .text(d => `${d.value}%`)
        .style('font-size', 10)
}

// date picker
// The date picker (read the docs)
$('#datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d'
})
.on('changeDate', function(e) {
    console.log(e);

    windFarmVisual.renderLocationOnDate(e.date);

    $('.datepicker').hide();
})


// vessel location 
let url = "https://services.marinetraffic.com/api/exportvessel/7daea873a339ac6dadb9847d175b397cea60f977?v=5&mmsi=211696680&timespan=2880&msgtype=extended&protocol=jsono";
fetch(url)
.then(res => res.json())
.then(shipInfo => {
    console.log(shipInfo);

    // desctructre the response
    updateShipInfo(shipInfo);
    updateShipLocation(shipInfo);
})
.catch(console.error);

function updateShipLocation(info) {
    if(info.length > 1) {
        // render a path
    }

    let coordinates = [+info[0].LON, +info[0].LAT];
    let el = document.createElement("div");
    el.className = "div-marker-icon";
    el.innerHTML = '<img src="icons/ship.png" alt="Wildcat 34" />'

    let markerLocation = new mapboxgl.Marker({element:el})
        .setLngLat(coordinates)
        .addTo(map)

    // popup
    let contentInfo = Object.keys(info[0]).map(key => {
        return `<div class="item-info">
            <b>${key}:</b>
            <span>${info[0][key]}</span>
        </div>`
    });
    
    let popupContent = `<div class="popup-content">
        <div class="header-section">WILDCAT 34</div>

        <div class="content">
            ${contentInfo.join("")}
        </div>
    </div>`;

    let popup = new mapboxgl.Popup();
    popup.setHTML(popupContent)

    markerLocation.setPopup(popup);


    document.getElementById("zoom-btn").onclick = (e) => {
        map.flyTo({
            center:coordinates,
            zoom:12
        });
    }
}

function updateShipInfo(info) {
    let keys = [
        // "MMSI", 
        // "SPEED","HEADING", "COURSE",
        "LAST_PORT_TIME",
        "LAST_PORT", 
        "DESTINATION", "ETA"
    ];


    let infoVals = keys.map(key => {
        return `<div class="item-info">
            <b>${key}:</b>
            <span>${info[0][key]}</span>
        </div>`
    });

    document.getElementById("ship-info").innerHTML = infoVals.join("");
}