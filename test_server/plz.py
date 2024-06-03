import pandas as pd
from sqlalchemy import create_engine
import json

# MySQL 데이터베이스 연결 정보
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'database': 'capstone'
}

# SQLAlchemy를 사용하여 MySQL 데이터베이스에 연결
engine = create_engine(f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}/{db_config['database']}")

# SQL 쿼리 실행
query = """
SELECT 
    dong AS region,
    yongdo AS building_use,
    SUBSTRING(date, 1, 7) AS month,
    SUM((elec * 0.4777) + (gas * 2.6928)) AS total_emissions
FROM 
    elecgas
GROUP BY 
    dong, yongdo, SUBSTRING(date, 1, 7)
ORDER BY 
    dong, yongdo, month;
"""
df = pd.read_sql_query(query, engine)

# 데이터 구조 준비
data = {}

# 데이터를 주어진 구조에 맞게 삽입
for idx, row in df.iterrows():
    region = row['region']
    building_use = row['building_use']
    month = row['month']
    emissions = int(row['total_emissions'])  # 소수점 제거
    
    if region not in data:
        data[region] = {}
    if building_use not in data[region]:
        data[region][building_use] = {'emissions': 0, 'monthly': [0] * 12}
    
    try:
        month_idx = int(month.split('-')[1]) - 1  # 1월은 index 0에 해당
        data[region][building_use]['monthly'][month_idx] = emissions
        data[region][building_use]['emissions'] += emissions
    except IndexError:
        print(f"Invalid month format: {month}")

# 데이터베이스 연결 닫기
engine.dispose()

# 결과를 파일에 저장 (동과 용도가 바뀔 때 줄바꿈)
with open('emissions_data.txt', 'w', encoding='utf-8') as f:
    for region, region_data in data.items():
        f.write(f"'{region}': {{\n")
        for building_use, details in region_data.items():
            building_use_str = f"    '{building_use}': {json.dumps(details, ensure_ascii=False)},\n\n"
            f.write(building_use_str)
        f.write("},\n\n")

print("데이터가 emissions_data.txt 파일에 저장되었습니다.")
