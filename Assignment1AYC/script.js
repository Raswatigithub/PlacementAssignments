let predefinedColumns= ["CGST", "Stamp Duty", "Transn Chrg"," CGST on Transn Chrg", "STT", "Sebi Turnover Tax", "SGST", "IGST", "Other Chrg."];
let fileData=[];

const uploadFile =()=>{
    let fileUpload=document.getElementById('fileUpload');
    let file = fileUpload.files[0];
    if (!file) {
        alert("No file selected");
        return;
    }
    
    let reader=new FileReader();

    reader.onload=function(e){
        let data=new Uint8Array(reader.result);
        let workbook=XLSX.read(data,{type:'array'});
        let firstSheet =workbook.Sheets[workbook.SheetNames[0]];
        fileData=XLSX.utils.sheet_to_json(firstSheet,{header:1});

        displayFilePreview(fileData);
        mapColums(fileData[0]);
    };
    reader.readAsArrayBuffer(file);
};

const displayFilePreview=(data)=>{
    let previewSection=document.getElementById('preview-section');
    let table='<table border="1">';
    data.slice(0,5).forEach(row=>{
        table +='<tr>';
        row.forEach(cell=>{
            table += `<td>${cell}</td>`;
        })
        table +='</tr>'
    })
    table += '</table>'
    previewSection.innerHTML=table;
}

const mapColums=(headers)=>{
    let previewSection=document.getElementById('preview-section');;
    let mappingHtml='<h2> Column Mapping </h2>';

    predefinedColumns.forEach(predefined =>{
        mappingHtml +=`<div class="column-mapping"> 
        <span>${predefined}</span>
        <select id="map-${predefined}">
            ${headers.map(header=>`<option value="${header}">${header}</option>`).join('')}
        </select>
        </div>`;
    })
    mappingHtml +='<button onclick="processFile()">Process File</button>';
    previewSection.innerHTML += mappingHtml;
}

const processFile=()=>{
    let aggregatedTaxes = [];
    let headers = fileData[0];
    let mappedColumns = {};

    predefinedColumns.forEach(predefined => {
        let selected = document.getElementById(`map-${predefined}`).value;
        mappedColumns[predefined] = headers.indexOf(selected);
    });

    fileData.slice(1).forEach(row => {
        let total = predefinedColumns.reduce((sum, column) => {
            return sum + (parseFloat(row[mappedColumns[column]]) || 0);
        }, 0);
        aggregatedTaxes.push(total);
    });

    displayAggregatedResults(aggregatedTaxes);
}

const displayAggregatedResults=(aggregatedTaxes)=>{
    let aggregatedSection = document.getElementById('aggregated-section');
    aggregatedSection.innerHTML = '<h3>Aggregated Taxes</h3>';
    aggregatedTaxes.forEach((value, index) => {
        aggregatedSection.innerHTML += `<p>Row ${index + 1}: ${value.toFixed(2)}</p>`;
    });
}