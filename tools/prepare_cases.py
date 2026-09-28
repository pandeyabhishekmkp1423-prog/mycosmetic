import cv2
import os

cases_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\cases"
os.makedirs(cases_dir, exist_ok=True)
rk_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\rk"

def crop_and_resize(img, x1, y1, x2, y2, target_size=(600, 600)):
    crop = img[y1:y2, x1:x2]
    # Resize keeping aspect or high quality
    h, w = crop.shape[:2]
    return crop

# 1. Rhinoplasty Frontal Case 1 (Image #5: WhatsApp Image 2026-09-28 at 3.01.35 PM.jpeg)
im5 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.35 PM.jpeg"))
h5, w5 = im5.shape[:2] # 600, 929
# Left side face: eye bar from y=165 to y=250, x=75 to 370
cv2.rectangle(im5, (75, 170), (370, 245), (18, 24, 38), -1)
cv2.rectangle(im5, (75, 170), (370, 245), (45, 55, 75), 1)
# Right side face: eye bar from y=190 to y=275, x=570 to 865
cv2.rectangle(im5, (570, 195), (865, 270), (18, 24, 38), -1)
cv2.rectangle(im5, (570, 195), (865, 270), (45, 55, 75), 1)

# Split halves
before_rhino1 = im5[:, :w5//2]
after_rhino1 = im5[:, w5//2:]
cv2.imwrite(os.path.join(cases_dir, "rhino_01_before.jpg"), before_rhino1)
cv2.imwrite(os.path.join(cases_dir, "rhino_01_after.jpg"), after_rhino1)
cv2.imwrite(os.path.join(cases_dir, "rhino_01_full.jpg"), im5)

# 2. Gynecomastia Case 1 (Image #1: WhatsApp Image 2026-09-28 at 3.01.33 PM.jpeg)
im1 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.33 PM.jpeg"))
h1, w1 = im1.shape[:2] # 555, 1047
before_gyn1 = im1[:, :510]
after_gyn1 = im1[:, 535:]
cv2.imwrite(os.path.join(cases_dir, "gyn_01_before.jpg"), before_gyn1)
cv2.imwrite(os.path.join(cases_dir, "gyn_01_after.jpg"), after_gyn1)
cv2.imwrite(os.path.join(cases_dir, "gyn_01_full.jpg"), im1)

# 3. Tummy Tuck Case 1 (Image #3: WhatsApp Image 2026-09-28 at 3.01.34 PM.jpeg)
im3 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.34 PM.jpeg"))
h3, w3 = im3.shape[:2] # 1094, 1280
before_tuck1 = im3[:, :635]
after_tuck1 = im3[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "tuck_01_before.jpg"), before_tuck1)
cv2.imwrite(os.path.join(cases_dir, "tuck_01_after.jpg"), after_tuck1)
cv2.imwrite(os.path.join(cases_dir, "tuck_01_full.jpg"), im3)

# 4. Gynecomastia Case 2 (Image #9: WhatsApp Image 2026-09-28 at 3.01.37 PM (1).jpeg)
im9 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.37 PM (1).jpeg"))
h9, w9 = im9.shape[:2] # 1041, 1280
before_gyn2 = im9[:, :635]
after_gyn2 = im9[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "gyn_02_before.jpg"), before_gyn2)
cv2.imwrite(os.path.join(cases_dir, "gyn_02_after.jpg"), after_gyn2)
cv2.imwrite(os.path.join(cases_dir, "gyn_02_full.jpg"), im9)

# 5. Tummy Tuck / Body Contouring Case 2 (Image #13: WhatsApp Image 2026-09-28 at 3.01.38 PM.jpeg)
im13 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.38 PM.jpeg"))
h13, w13 = im13.shape[:2] # 1220, 1280
before_tuck2 = im13[:, :635]
after_tuck2 = im13[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "tuck_02_before.jpg"), before_tuck2)
cv2.imwrite(os.path.join(cases_dir, "tuck_02_after.jpg"), after_tuck2)
cv2.imwrite(os.path.join(cases_dir, "tuck_02_full.jpg"), im13)

# 6. Rhinoplasty Case 2 (Image #53: WhatsApp Image 2026-09-28 at 3.02.01 PM (1).jpeg)
im53 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.02.01 PM (1).jpeg"))
h53, w53 = im53.shape[:2] # 565, 866
# Mask eyes on both faces
cv2.rectangle(im53, (40, 130), (380, 205), (18, 24, 38), -1)
cv2.rectangle(im53, (40, 130), (380, 205), (45, 55, 75), 1)
cv2.rectangle(im53, (470, 125), (820, 200), (18, 24, 38), -1)
cv2.rectangle(im53, (470, 125), (470+350, 200), (45, 55, 75), 1)
before_rhino2 = im53[:, :w53//2]
after_rhino2 = im53[:, w53//2:]
cv2.imwrite(os.path.join(cases_dir, "rhino_02_before.jpg"), before_rhino2)
cv2.imwrite(os.path.join(cases_dir, "rhino_02_after.jpg"), after_rhino2)
cv2.imwrite(os.path.join(cases_dir, "rhino_02_full.jpg"), im53)

# 7. Breast Surgery (Image #28: WhatsApp Image 2026-09-28 at 3.01.53 PM (1).jpeg)
im28 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.53 PM (1).jpeg"))
h28, w28 = im28.shape[:2] # 1136, 1280
before_breast = im28[:, :635]
after_breast = im28[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "breast_01_before.jpg"), before_breast)
cv2.imwrite(os.path.join(cases_dir, "breast_01_after.jpg"), after_breast)
cv2.imwrite(os.path.join(cases_dir, "breast_01_full.jpg"), im28)

# 8. Lip Enhancement / Reshaping (Image #43: WhatsApp Image 2026-09-28 at 3.01.58 PM (1).jpeg)
im43 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.58 PM (1).jpeg"))
h43, w43 = im43.shape[:2] # 841, 736
# Check if vertical or horizontal split
# Let's save both or split accordingly
if w43 > h43:
    before_lip = im43[:, :w43//2]
    after_lip = im43[:, w43//2:]
else:
    before_lip = im43[:h43//2, :]
    after_lip = im43[h43//2:, :]
cv2.imwrite(os.path.join(cases_dir, "lip_01_before.jpg"), before_lip)
cv2.imwrite(os.path.join(cases_dir, "lip_01_after.jpg"), after_lip)
cv2.imwrite(os.path.join(cases_dir, "lip_01_full.jpg"), im43)

# 9. Mole Excision (Image #44: WhatsApp Image 2026-09-28 at 3.01.58 PM (2).jpeg)
im44 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.58 PM (2).jpeg"))
h44, w44 = im44.shape[:2] # 348, 792
before_mole = im44[:, :w44//2]
after_mole = im44[:, w44//2:]
cv2.imwrite(os.path.join(cases_dir, "mole_01_before.jpg"), before_mole)
cv2.imwrite(os.path.join(cases_dir, "mole_01_after.jpg"), after_mole)
cv2.imwrite(os.path.join(cases_dir, "mole_01_full.jpg"), im44)

# 10. High-Definition 360 Liposuction (Image #18: WhatsApp Image 2026-09-28 at 3.01.40 PM.jpeg)
im18 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.40 PM.jpeg"))
h18, w18 = im18.shape[:2]
before_lipo = im18[:, :w18//2]
after_lipo = im18[:, w18//2:]
cv2.imwrite(os.path.join(cases_dir, "lipo_01_before.jpg"), before_lipo)
cv2.imwrite(os.path.join(cases_dir, "lipo_01_after.jpg"), after_lipo)
cv2.imwrite(os.path.join(cases_dir, "lipo_01_full.jpg"), im18)

print("All 10 curated clinical case pairs generated successfully!")
