import cv2
import os

cases_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\cases"
os.makedirs(cases_dir, exist_ok=True)
rk_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\rk"

# Eye bar color: Deep surgical navy/slate with thin border
BAR_COLOR = (22, 28, 38)
BORDER_COLOR = (50, 60, 80)

def apply_eye_bar(img, x1, y1, x2, y2):
    cv2.rectangle(img, (x1, y1), (x2, y2), BAR_COLOR, -1)
    cv2.rectangle(img, (x1, y1), (x2, y2), BORDER_COLOR, 1)

# -------------------------------------------------------------
# 1. Rhinoplasty Profile Female (Image #41)
# -------------------------------------------------------------
im41 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.57 PM (2).jpeg"))
h41, w41 = im41.shape[:2] # 1041, 1278
apply_eye_bar(im41, 130, 180, 380, 325)
apply_eye_bar(im41, 820, 140, 1040, 280)

split_41 = w41 // 2
before_rhino_p1 = im41[:, :split_41]
after_rhino_p1 = im41[:, split_41:]
cv2.imwrite(os.path.join(cases_dir, "rhino_profile_01_before.jpg"), before_rhino_p1)
cv2.imwrite(os.path.join(cases_dir, "rhino_profile_01_after.jpg"), after_rhino_p1)
cv2.imwrite(os.path.join(cases_dir, "rhino_profile_01_full.jpg"), im41)

# -------------------------------------------------------------
# 2. Rhinoplasty & Jawline 3/4 Oblique Female (Image #40)
# -------------------------------------------------------------
im40 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.57 PM (1).jpeg"))
h40, w40 = im40.shape[:2] # 898, 1280
apply_eye_bar(im40, 280, 305, 540, 395)
apply_eye_bar(im40, 940, 280, 1200, 370)

split_40 = 640
before_rhino_o1 = im40[:, :split_40]
after_rhino_o1 = im40[:, split_40:]
cv2.imwrite(os.path.join(cases_dir, "rhino_oblique_01_before.jpg"), before_rhino_o1)
cv2.imwrite(os.path.join(cases_dir, "rhino_oblique_01_after.jpg"), after_rhino_o1)
cv2.imwrite(os.path.join(cases_dir, "rhino_oblique_01_full.jpg"), im40)

# -------------------------------------------------------------
# 3. Rhinoplasty Frontal Male (Image #5)
# -------------------------------------------------------------
im5 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.35 PM.jpeg"))
h5, w5 = im5.shape[:2] # 600, 929
apply_eye_bar(im5, 75, 160, 375, 260)
apply_eye_bar(im5, 565, 185, 875, 295)

split_5 = w5 // 2
before_rhino_f1 = im5[:, :split_5]
after_rhino_f1 = im5[:, split_5:]
cv2.imwrite(os.path.join(cases_dir, "rhino_frontal_01_before.jpg"), before_rhino_f1)
cv2.imwrite(os.path.join(cases_dir, "rhino_frontal_01_after.jpg"), after_rhino_f1)
cv2.imwrite(os.path.join(cases_dir, "rhino_frontal_01_full.jpg"), im5)

# -------------------------------------------------------------
# 4. Chin Augmentation & Neck Contour (Image #42)
# -------------------------------------------------------------
im42 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.57 PM.jpeg"))
h42, w42 = im42.shape[:2] # 900, 1280
apply_eye_bar(im42, 210, 305, 400, 430)
apply_eye_bar(im42, 805, 340, 960, 465)

split_42 = 640
before_chin_p1 = im42[:, :split_42]
after_chin_p1 = im42[:, split_42:]
cv2.imwrite(os.path.join(cases_dir, "chin_profile_01_before.jpg"), before_chin_p1)
cv2.imwrite(os.path.join(cases_dir, "chin_profile_01_after.jpg"), after_chin_p1)
cv2.imwrite(os.path.join(cases_dir, "chin_profile_01_full.jpg"), im42)

# -------------------------------------------------------------
# 5. Gynecomastia Athletic Correction (Image #1)
# -------------------------------------------------------------
im1 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.33 PM.jpeg"))
# Clean crop excluding middle arrow
before_gyn1 = im1[:, :510]
after_gyn1 = im1[:, 535:]
cv2.imwrite(os.path.join(cases_dir, "gyn_01_before.jpg"), before_gyn1)
cv2.imwrite(os.path.join(cases_dir, "gyn_01_after.jpg"), after_gyn1)

# -------------------------------------------------------------
# 6. Scarless Gynecomastia Correction (Image #9)
# -------------------------------------------------------------
im9 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.37 PM (1).jpeg"))
# Crop photo below text banner (banner ends around y=360)
h9, w9 = im9.shape[:2]
im9_crop = im9[360:, :]
h9c, w9c = im9_crop.shape[:2]
before_gyn2 = im9_crop[:, :610]
after_gyn2 = im9_crop[:, 650:]
cv2.imwrite(os.path.join(cases_dir, "gyn_02_before.jpg"), before_gyn2)
cv2.imwrite(os.path.join(cases_dir, "gyn_02_after.jpg"), after_gyn2)

# -------------------------------------------------------------
# 7. Female Breast Augmentation (Image #28)
# -------------------------------------------------------------
im28 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.53 PM (1).jpeg"))
# Crop below text banner (banner ends around y=250)
im28_crop = im28[240:, :]
before_breast1 = im28_crop[:, :625]
after_breast1 = im28_crop[:, 655:]
cv2.imwrite(os.path.join(cases_dir, "breast_01_before.jpg"), before_breast1)
cv2.imwrite(os.path.join(cases_dir, "breast_01_after.jpg"), after_breast1)

# -------------------------------------------------------------
# 8. Full Abdominoplasty Frontal (Image #3)
# -------------------------------------------------------------
im3 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.34 PM.jpeg"))
before_tuck1 = im3[:, :635]
after_tuck1 = im3[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "tuck_01_before.jpg"), before_tuck1)
cv2.imwrite(os.path.join(cases_dir, "tuck_01_after.jpg"), after_tuck1)

# -------------------------------------------------------------
# 9. Lateral Profile Tummy Tuck (Image #2)
# -------------------------------------------------------------
im2 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.34 PM (1).jpeg"))
before_tuck2 = im2[:, :635]
after_tuck2 = im2[:, 645:]
cv2.imwrite(os.path.join(cases_dir, "tuck_02_before.jpg"), before_tuck2)
cv2.imwrite(os.path.join(cases_dir, "tuck_02_after.jpg"), after_tuck2)

# -------------------------------------------------------------
# 10. Scarless Facial Mole Excision (Image #44)
# -------------------------------------------------------------
im44 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.58 PM (2).jpeg"))
w44 = im44.shape[1]
before_mole1 = im44[:, :w44//2]
after_mole1 = im44[:, w44//2:]
cv2.imwrite(os.path.join(cases_dir, "mole_01_before.jpg"), before_mole1)
cv2.imwrite(os.path.join(cases_dir, "mole_01_after.jpg"), after_mole1)

# -------------------------------------------------------------
# 11. Aesthetic Lip Augmentation (Image #43)
# -------------------------------------------------------------
im43 = cv2.imread(os.path.join(rk_dir, "WhatsApp Image 2026-09-28 at 3.01.58 PM (1).jpeg"))
h43 = im43.shape[0]
before_lip1 = im43[:h43//2, :]
after_lip1 = im43[h43//2:, :]
cv2.imwrite(os.path.join(cases_dir, "lip_01_before.jpg"), before_lip1)
cv2.imwrite(os.path.join(cases_dir, "lip_01_after.jpg"), after_lip1)

print("Successfully generated all 11 standardized clinical case sets with privacy eye bars!")
