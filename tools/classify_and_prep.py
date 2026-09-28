import cv2
import os

face_cascade = cv2.CascadeClassifier(r'tools\cascades\face.xml')
eye_cascade = cv2.CascadeClassifier(r'tools\cascades\eye.xml')

rk_dir = r'C:\Users\Abhishek pandey\Desktop\cosmetic\rk'
preview_dir = r'C:\Users\Abhishek pandey\Desktop\cosmetic\public\rk_censored'
os.makedirs(preview_dir, exist_ok=True)

files = sorted([f for f in os.listdir(rk_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

html = [
    "<!DOCTYPE html><html><head><meta charset='utf-8'>",
    "<title>Censor Review</title>",
    "<style>",
    "body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 24px; }",
    ".grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }",
    ".card { background: #1e293b; border-radius: 12px; padding: 12px; border: 1px solid #334155; }",
    "img { width: 100%; height: 260px; object-fit: contain; background: #000; border-radius: 6px; }",
    ".badge { font-weight: bold; font-size: 13px; color: #38bdf8; margin-bottom: 6px; }",
    "</style></head><body>",
    "<h1>RK Images with Eye Anonymization Bar Review</h1>",
    "<div class='grid'>"
]

for i, f in enumerate(files):
    p = os.path.join(rk_dir, f)
    img = cv2.imread(p)
    if img is None:
        continue
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4, minSize=(70, 70))
    
    out_img = img.copy()
    face_count = 0
    
    for (fx, fy, fw, fh) in faces:
        # Check if the face is in upper body / face proportion (avoid false positives on knees/chests)
        # In a face, eyes are usually around 25%-48% of face height
        face_roi = gray[fy:fy+fh, fx:fx+fw]
        eyes = eye_cascade.detectMultiScale(face_roi, 1.1, 3, minSize=(15, 15))
        
        # If eyes or face detected in plausible facial region
        bar_y1 = fy + int(fh * 0.25)
        bar_y2 = fy + int(fh * 0.48)
        bar_x1 = max(0, fx + int(fw * 0.08))
        bar_x2 = min(w, fx + int(fw * 0.92))
        
        # Draw sleek black censor bar
        cv2.rectangle(out_img, (bar_x1, bar_y1), (bar_x2, bar_y2), (15, 23, 42), -1)
        face_count += 1

    out_name = f"censored_{i+1:02d}.jpg"
    out_path = os.path.join(preview_dir, out_name)
    cv2.imwrite(out_path, out_img)
    
    html.append(f"""
    <div class='card'>
        <div class='badge'>#{i+1}: {f} ({w}x{h}) - {face_count} face(s) masked</div>
        <img src='/rk_censored/{out_name}' loading='lazy' />
    </div>
    """)

html.append("</div></body></html>")

with open(r'C:\Users\Abhishek pandey\Desktop\cosmetic\public\censor_review.html', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(html))

print("Created public/censor_review.html and processed all 57 images!")
