import matplotlib.pyplot as plt
import squarify

# 한글 폰트 설정 (Windows 예시)
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# 군산시 동별 데이터 설정
labels = [
    '수송동', '나운3동', '나운2동', '소룡동', '나운1동', '조촌동', '미성동', '흥남동',
    '신풍동', '경암동', '월명동', '삼학동', '구암동', '대야면', '옥도면', '옥서면',
    '중앙동', '회현면', '옥구읍', '개정동', '개정동', '성산면', '임피면', '서수면',
    '옥산면', '나포면', '해신동'
]
populations = [
    50243, 37236, 26961, 19445, 16193, 15813, 15367, 11089,
    8400, 8250, 7301, 6963, 6538, 5722, 4152, 4061,
    3744, 3744, 3593, 3591, 3496, 3452, 3332, 2878,
    2813, 2243, 2133
]
carbon_emissions = [
    1000, 850, 720, 640, 530, 490, 460, 400,
    320, 300, 280, 260, 240, 220, 200, 180,
    160, 150, 140, 130, 120, 110, 100, 90,
    80, 70, 60
]

# 인구수를 스케일링하여 크기 조정
scale_factor = 0.001  # 적절한 스케일링 팩터 설정
sizes = [pop * scale_factor for pop in populations]

# 색상 설정
colors = plt.cm.tab20c(range(len(labels)))

# Treemap 생성
fig, ax = plt.subplots(figsize=(14, 10))
squarify.plot(sizes=sizes, label=labels, color=colors, alpha=0.7, text_kwargs={'fontsize': 12})

# 제목 설정
plt.title('군산시 동별 인구수 Treemap', fontsize=20)
plt.axis('off')

# 이미지 파일로 저장
plt.savefig('gunsan_treemap.png', bbox_inches='tight')

# 시각화
plt.show()
