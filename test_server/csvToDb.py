# import pandas as pd
# import pymysql
# import numpy as np
# from datetime import datetime

# # CSV 파일 경로
# csv_file_path = 'test_server/real_last_monthly_gangnam_elec_gas_fusion.csv'

# # CSV 파일 읽기
# df = pd.read_csv(csv_file_path, low_memory=False)

# df = df.where(pd.notnull(df), None)

# df = df.replace({np.nan: None})

# # '사용_년월' 컬럼 값을 MySQL의 DATE 형식으로 변환
# def convert_date(date_str):
#     if date_str is not None:
#         return datetime.strptime(date_str, "%Y-%m").strftime("%Y-%m-%d")
#     return None

# df['사용_년월'] = df['사용_년월'].apply(convert_date)


# # MySQL 연결 설정
# connection = pymysql.connect(
#     host='localhost',
#     user='root',
#     password='1234',
#     database='capstone'
# )

# cursor = connection.cursor()

# # id 초기값 설정
# current_id = 0

# # 데이터 삽입
# for index, row in df.iterrows():
#     insert_query = '''
#     INSERT INTO elecgas (id, sido, sigungu, dong, date, elec, gas)
#     VALUES (%s, %s, %s, %s, %s, %s, %s)
#     '''
#     cursor.execute(insert_query, (
#         current_id,
#         row['시도'],
#         row['시군구'],
#         row['법정동'],
#         row['사용_년월'],
#         row['전기사용량'],
#         row['가스사용량']
#     ))
#     current_id += 1

# # 변경 사항 커밋
# connection.commit()

# # 커서와 연결 종료
# cursor.close()
# connection.close()
# CSV 파일 읽기
import pandas as pd
file_path = 'test_server/real_last_monthly_gangnam_elec_gas_fusion.csv'

# CSV 파일 읽기
df = pd.read_csv(file_path)

# '전기사용량' 및 '가스사용량' 컬럼이 존재하는지 확인
if '전기사용량' in df.columns and '가스사용량' in df.columns:
    # 시도, 시군구, 법정동, 대지위치, 사용_년월 별로 전기사용량과 가스사용량 합계 계산
    df_grouped = df.groupby(['시도', '시군구', '법정동', '대지위치', '사용_년월']).agg({
        '전기사용량': 'sum',
        '가스사용량': 'sum'
    }).reset_index()

    # 새로운 CSV 파일로 저장
    output_path = 'grouped_usage_by_region_and_month.csv'
    df_grouped.to_csv(output_path, index=False)

    output_path
else:
    "전기사용량 및 가스사용량 컬럼이 없습니다."



