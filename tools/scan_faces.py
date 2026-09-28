import cv2
import os
import json

face_cascade = cv2.CascadeClassifier(r'tools\cascades\face.xml')
rk_dir = r'C:\Users\Abhishek pandey\Desktop\cosmetic\rk'
files = sorted([f for f in os.listdir(rk_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

results = []
for i, f in enumerate(files):
    p = os.path.join(rk_dir, f)
    img = cv2.imread(p)
    if img is None:
        continue
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4, minSize=(60, 60))
    results.append({
        'idx': i + 1,
        'filename': f,
        'width': w,
        'height': h,
        'faces': len(faces),
        'rects': [list(map(int, r)) for r in faces]
    })

print(f"Total scanned: {len(results)}")
face_results = [r for r in results if r['faces'] > 0]
print(f"Images with detected faces: {len(face_results)}")

for r in face_results:
    print(f"#{r['idx']:02d}: {r['filename']} ({r['width']}x{r['height']}) -> {r['faces']} face(s)")

with open('tools/scan_results.json', 'w', encoding='utf-8') as fp:
    json.dump(results, fp, indent=2)
print("Saved scan_results.json")
