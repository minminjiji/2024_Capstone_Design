from flask import Flask, jsonify,render_template
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)

# @app.route('/')
# def get_data():
#     url = 'http://apis.data.go.kr/B553530/GHG_LIST_02/GHG_LIST_02_01_VIEW'
#     params ={'serviceKey' : 'McoBkTknXzPo2wiYGXkSHkGMUj1dZ53x2qTaZEiyxUnNC9vS7HjcOTfbl9eFpU%2BEPcjMtu58EHbXLNg44s%2Bm0A%3D%3D', 'pageNo' : '1', 'numOfRows' : '10', 'apiType' : 'XML', 'q1' : '2018', 'q2' : 'CO2' }

#     # API 요청
#     response = requests.get(url)
    
#     # 응답 데이터 파싱
#     if response.status_code == 200:
#         root = ET.fromstring(response.content)
        
#         # 항목들을 저장할 리스트 생성
#         data_list = []
        
#         # 각 <item> 태그 내의 데이터 추출
#         for item in root.findall('.//item'):
#             item_data = {
#                 'numOfRows': item.find('numOfRows').text,
#                 'pageNo': item.find('pageNo').text,
#                 'totalCount': item.find('totalCount').text,
#                 'TRGT_YEAR': item.find('TRGT_YEAR').text,
#                 'DATA_DVSN_CD': item.find('DATA_DVSN_CD').text,
#                 'ENGSRC_NM': item.find('ENGSRC_NM').text,
#                 'TRNSPT_TOB_NM': item.find('TRNSPT_TOB_NM').text,
#                 'USEMS_QNTY': item.find('USEMS_QNTY').text,
#                 'UNIT_NM': item.find('UNIT_NM').text,
#                 'DATA_REG_DT': item.find('DATA_REG_DT').text
#             }
#             data_list.append(item_data)
        
#         # 데이터 JSON 형태로 반환
#         return jsonify(data_list)
#     else:
#         return jsonify({"error": "Failed to retrieve data"}), response.status_code

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/introduce')
def introduce():
    return render_template('introduce.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/gas')
def gas():
    return render_template('gas.html')

@app.route('/elec')
def elec():
    return render_template('elec.html')

@app.route('/data')
def data():
    return render_template('data.html')

if __name__ == '__main__':
    app.run(debug=True)