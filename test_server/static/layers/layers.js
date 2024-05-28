var wms_layers = [];


        var lyr_XYZLayer_0 = new ol.layer.Tile({
            'title': 'XYZ Layer',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'http://api.vworld.kr/req/wmts/1.0.0/495F784B-2196-3442-9570-1C6842AF1428/Base/{z}/{y}/{x}.png'
            })
        });
var format__1 = new ol.format.GeoJSON();
var features__1 = format__1.readFeatures(json__1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__1.addFeatures(features__1);
var lyr__1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__1, 
                style: style__1,
                popuplayertitle: "강남구",
                interactive: true,
                title: '<img src="styles/legend/_1.png" /> 강남구'
            });

lyr_XYZLayer_0.setVisible(true);lyr__1.setVisible(true);
var layersList = [lyr_XYZLayer_0,lyr__1];
lyr__1.set('fieldAliases', {'A0': 'A0', 'A1': 'A1', 'A2': 'A2', 'A3': 'A3', '법정동명': '법정동명', 'A5': 'A5', 'A6': 'A6', '지번': '지번', 'A8': 'A8', 'A9': 'A9', 'A10': 'A10', 'A11': 'A11', 'A12': 'A12', '건물명': '건물명', 'A14': 'A14', 'A15': 'A15', 'A16': 'A16', 'A17': 'A17', 'A18': 'A18', '주요용도명': '주요용도명', 'A20': 'A20', 'A21': 'A21', 'A22': 'A22', 'A23': 'A23', '사용승인일자': '사용승인일자', '건물연령': '건물연령', 'A26': 'A26', 'A27': 'A27', 'A28': 'A28', 'A29': 'A29', 'A30': 'A30', });
lyr__1.set('fieldImages', {'A0': 'Range', 'A1': 'TextEdit', 'A2': 'TextEdit', 'A3': 'TextEdit', '법정동명': 'TextEdit', 'A5': 'TextEdit', 'A6': 'TextEdit', '지번': 'TextEdit', 'A8': 'TextEdit', 'A9': 'TextEdit', 'A10': 'TextEdit', 'A11': 'TextEdit', 'A12': 'TextEdit', '건물명': 'TextEdit', 'A14': 'TextEdit', 'A15': 'TextEdit', 'A16': 'TextEdit', 'A17': 'TextEdit', 'A18': 'TextEdit', '주요용도명': 'TextEdit', 'A20': 'TextEdit', 'A21': 'Range', 'A22': 'Range', 'A23': 'TextEdit', '사용승인일자': 'TextEdit', '건물연령': 'Range', 'A26': 'TextEdit', 'A27': 'TextEdit', 'A28': 'TextEdit', 'A29': 'TextEdit', 'A30': 'TextEdit', });
lyr__1.set('fieldLabels', {'A0': 'hidden field', 'A1': 'hidden field', 'A2': 'hidden field', 'A3': 'hidden field', '법정동명': 'inline label - always visible', 'A5': 'hidden field', 'A6': 'hidden field', '지번': 'inline label - always visible', 'A8': 'hidden field', 'A9': 'hidden field', 'A10': 'hidden field', 'A11': 'hidden field', 'A12': 'hidden field', '건물명': 'inline label - always visible', 'A14': 'hidden field', 'A15': 'hidden field', 'A16': 'hidden field', 'A17': 'hidden field', 'A18': 'hidden field', '주요용도명': 'inline label - always visible', 'A20': 'hidden field', 'A21': 'hidden field', 'A22': 'hidden field', 'A23': 'hidden field', '사용승인일자': 'inline label - always visible', '건물연령': 'inline label - always visible', 'A26': 'hidden field', 'A27': 'hidden field', 'A28': 'hidden field', 'A29': 'hidden field', 'A30': 'hidden field', });
lyr__1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});