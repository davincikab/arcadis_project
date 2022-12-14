const vesselIcon = "data:image/png;base64,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";
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
        data:{ "type":"FeatureCollection", "features":[] }
    });

    map.addLayer({
        id:'turbine',
        source:'turbines',
        type:'symbol',
        paint:{
            
        },
        layout:{
            'text-field':['get', 'Location'],
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

                map.getSource('turbines')
                    .setData(
                        {'type':"FeatureCollection", 
                        "features":[...this.turbineLocations]
                    });
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
                color = "#358600";
            }else if(cable['OTDR tested']) { 
                color = "#9EE37D";
            } else if(cable['SAT tested']) {
                color = "#63C132";
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
        this.map.getSource('cables').setData(cableJson);

        let bbox = turf.bbox(cableJson);

        this.map.fitBounds(bbox, {
            padding: 70
        });
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

            let completeValue = valueData/this.sheets['Z01 Array Termination Progress'].length;
            let incompleteValue = 100 - parseInt(completeValue);

            data = [
                // { label:"Incomplete", status:true, value:incompleteValue, color:'red'},
                // { label:"Complete", status:true, value:completeValue, color:'green'},
                
                
                { label:"Incomplete", status:true, value:completeValue, color:'green'},
                { label:"complete", status:true, value:incompleteValue, color:'#75CFF0'}
            ];

        } else {
            data = [
                { label:"In Survey", status:properties["In Survey"], value:1, color:'#4285F4'},
                { label:"Hang Off Complete", status:properties["Hang Off Complete"], value:1, color:'#EA4335'},
                { label:"FO Works Complete", status:properties["FO Works Complete"], value:1, color:'#FBBC04'},
                { label:"HV Works Complete", status:properties["HV Works Complete"], value:1, color:'#34A853'},
                { label:"QC Walkdown Complete", status:properties["QC Walkdown Complete"], value:1, color:'#FF6D01'},
                { label:"Out Survey", status:properties["Out Survey"], value:1, color:'#333'}
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

        let cableTestColors = {
            "OTDR tested":"#9EE37D",
            "SAT tested":"#63C132",
            "Fully Tested":"#358600"
        };   

        
        let keys = Object.keys(cableTestColors);
        let cableTestSection = document.getElementById("cable-progress");

        keys.forEach(key => {
            let count = this.cables.filter(cable => cable[key]).length;
            if(key == "Fully Tested") {
                count = this.cables.filter(cable => cable["OTDR tested"] && cable["SAT tested"]).length;
            }

            let section = `<div class="progress-section">
                <div class="info">
                    <div class="progress-tracker" style="background-color:${cableTestColors[key]};"></div>
                    <span>${count} of ${this.cables.length} cables</span>
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
                { label:"Out Survey", status:properties["Out Survey"], value:1, color:'#333'}
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
        this.myImage = document.getElementById("my-image");

        if(vesselLocation) vesselLocation.remove();

        
        // this.dateSection.classList.toggle('d-none');
        html2canvas(node, {
            useCORS: true,
            logging: true,
            // allowTaint:false
        }).then(canvas => {
            // console.log(canvas);
            this.myImage.src = canvas.toDataURL();
            // this.myImage.style.transform = "rotate(90deg)";

            elementNode.classList.toggle('d-none');
            this.dateSection.innerHTML = this.formatDate(new Date());
            
            this.myImage.onload = (e) => {
                html2canvas(this.myImage, { useCORS: true, logging: true})
                .then(canvasContainer => {
                    // console.log(canvasContainer.toDataURL());

                    let date = this.formatDate(new Date()).replace(/\//g, "-");
                    createPdf(canvas.toDataURL(), date);
                    this.myImage.src = "#"
                    // this.dateSection.classList.toggle('d-none');

                    if(vesselLocation) vesselLocation.addTo(map);
                });
            }
            


            // 
        });

        // let pdfDocEl = document.getElementById('pdf');
        async function createPdf(imageBuffer, currentDate) {
            console.log(imageBuffer);

            const pdfDoc = await PDFLib.PDFDocument.create();

            const pngImage = await pdfDoc.embedPng(imageBuffer);
            const pngDims = pngImage.scaleToFit(500, 780);

            // console.log(pngDims);

            const page = pdfDoc.addPage();
            // console.log(page.getWidth())

            page.drawImage(pngImage, {
                x: 120,
                y: 30,
                width: 360,
                height: pngDims.height,
            });

            // page.moveTo(130, 810);
            // page.drawText('Parkwind Status Tracker for Array Termination', {size:16});

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            // pdfDocEl.src = pdfDataUri;

            // pdfDocEl.classList.toggle("d-none");

            // var w = window.parent.open("");
            // console.log(w);

            // let info = `<iframe id="pdf" style="width: 100%; height: 100%;" src="${pdfDataUri}"></iframe>`;
            // let info = `<iframe 
            //     src="${pdfDataUri}"
            //     width="600" height="780" 
            //     style="position: absolute;top: 0px;bottom: 0px;right: 0px;width: 100%;border: none;margin: 0;padding: 0;;z-index: 3;height: 100%;"
            // ></iframe>`;

            // // w.document.write(info);

            // console.log(info);
            // document.getElementById("modal-body-container").innerHTML = info;
            // document.getElementById("modal-container").style.display = "block";

            // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
            // let date = new Date();
            currentDate = currentDate.split("/").reverse().join("");
            // currentDate = "08/11/2022".split("/").reverse().join("");

            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     imageBuffer    );
            dlAnchorElem.setAttribute("download", `${currentDate} Parkwind Status Map.png`);
            dlAnchorElem.click();

            // window.parent.localStorage.setItem("info", info);
            // window.parent.postMessage(info, 'https://smart-projex.com');
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


const windFarmVisual = new WindFarmVisual(map, []);
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
    
    var pie = d3.pie().value(function(d) { return d.value}).sort(null);
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
// $('#datepicker').datepicker({
//     format: 'mm/dd/yyyy',
//     startDate: '-3d'
// })
// .on('changeDate', function(e) {
//     console.log(e);

//     windFarmVisual.renderLocationOnDate(e.date);

//     $('.datepicker').hide();
// })


// vessel location 
let url = "https://services.marinetraffic.com/api/exportvessel/7daea873a339ac6dadb9847d175b397cea60f977?v=5&mmsi=211696680&timespan=2880&msgtype=extended&protocol=jsono";
fetch(url)
.then(res => res.json())
.then(shipInfo => {
    if(shipInfo.errors) {
        throw new Error(shipInfo)
    }
    console.log(shipInfo);

    // desctructre the response
    updateShipLocation(shipInfo);
    updateShipInfo(shipInfo);
})
.catch(console.error);

var vesselLocation;
function updateShipLocation(info) {
    if(info.length > 1) {
        // render a path
    }

    let coordinates = [+info[0].LON, +info[0].LAT];
    // let coordinates = [13.65614561700636, 54.82135678178332];

    let el = document.createElement("div");
    el.className = "div-marker-icon";
    el.innerHTML = `<img src="${vesselIcon}" alt="Wildcat 34" />`;

    vesselLocation = new mapboxgl.Marker({element:el})
        .setLngLat(coordinates)
        .addTo(map);

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

    vesselLocation.setPopup(popup);


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


// resize map container to screen height
document.onload = function(e) {
    let mapContainer = document.querySelector(".map-container");

    // mapContainer.style.height = `${window.innerHeight}px`;
}

// document.getElementById("date-section").innerHTML = "08/11/2022";
document.getElementById("date-section").innerHTML = windFarmVisual.formatDate(new Date());