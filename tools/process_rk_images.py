import os
import shutil
import cv2

rk_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\rk"
backup_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\tools\whatsapp_backup"
public_rk = r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\rk"
cases_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\cases"

os.makedirs(backup_dir, exist_ok=True)
os.makedirs(public_rk, exist_ok=True)
os.makedirs(cases_dir, exist_ok=True)

# Clean public/rk of old files
for f in os.listdir(public_rk):
    p = os.path.join(public_rk, f)
    if os.path.isfile(p):
        try:
            os.remove(p)
        except Exception as e:
            print(f"Could not remove {p}: {e}")

mapping = [
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.45.59 AM.jpeg",
        "clean": "01-gynecomastia-male-chest-sculpting.jpg",
        "b_crop": (0, 510),
        "a_crop": (535, 1047),
        "title": "Minimally Invasive Gynecomastia & Chest Contouring",
        "category": "BREAST",
        "procedure": "Gynecomastia"
    },
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.46.00 AM (1).jpeg",
        "clean": "02-rhinoplasty-male-facial-contouring.jpg",
        "b_crop": (0, 464),
        "a_crop": (465, 929),
        "title": "Structural Male Rhinoplasty & Facial Harmonization",
        "category": "FACE",
        "procedure": "Rhinoplasty"
    },
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.46.00 AM (2).jpeg",
        "clean": "03-tummy-tuck-waist-liposculpture.jpg",
        "b_crop": (0, 571),
        "a_crop": (571, 1142),
        "title": "High-Definition Abdominal Liposculpture & Waist Contouring",
        "category": "BODY",
        "procedure": "Liposuction"
    },
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.46.00 AM (3).jpeg",
        "clean": "04-rhinoplasty-female-profile-sculpting.jpg",
        "b_crop": (0, 350),
        "a_crop": (360, 711),
        "title": "Preservation Rhinoplasty & Profile Harmonization",
        "category": "FACE",
        "procedure": "Rhinoplasty"
    },
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.46.00 AM.jpeg",
        "clean": "05-abdominoplasty-panniculectomy-tummy-tuck.jpg",
        "b_crop": (0, 640),
        "a_crop": (640, 1280),
        "title": "Full Abdominoplasty & Panniculectomy with Muscle Repair",
        "category": "BODY",
        "procedure": "Tummy Tuck"
    },
    {
        "raw": "WhatsApp Image 2026-09-29 at 10.46.01 AM.jpeg",
        "clean": "06-breast-augmentation-mammoplasty.jpg",
        "b_crop": (0, 635),
        "a_crop": (645, 1280),
        "title": "Aesthetic Dual-Plane Silicone Breast Augmentation",
        "category": "BREAST",
        "procedure": "Breast Augmentation"
    }
]

for item in mapping:
    raw_path = os.path.join(rk_dir, item["raw"])
    clean_rk_path = os.path.join(rk_dir, item["clean"])
    
    source_path = None
    if os.path.exists(raw_path):
        source_path = raw_path
        shutil.copy2(raw_path, os.path.join(backup_dir, item["raw"]))
    elif os.path.exists(clean_rk_path):
        source_path = clean_rk_path
    
    if not source_path:
        print(f"Cannot find source for {item['clean']}")
        continue
    
    img = cv2.imread(source_path)
    if img is None:
        print(f"Failed to read {source_path}")
        continue
        
    h, w = img.shape[:2]
    
    # Save cleanly named image to rk/
    cv2.imwrite(clean_rk_path, img)
    # Save cleanly named image to public/rk/
    cv2.imwrite(os.path.join(public_rk, item["clean"]), img)
    
    # Crop before and after
    bx1, bx2 = item["b_crop"]
    ax1, ax2 = item["a_crop"]
    b_part = img[:, bx1:bx2]
    a_part = img[:, ax1:ax2]
    
    bh, bw = b_part.shape[:2]
    a_part_resized = cv2.resize(a_part, (bw, bh), interpolation=cv2.INTER_LANCZOS4)
    
    prefix = item["clean"].replace(".jpg", "")
    cv2.imwrite(os.path.join(cases_dir, f"{prefix}_before.jpg"), b_part)
    cv2.imwrite(os.path.join(cases_dir, f"{prefix}_after.jpg"), a_part_resized)
    cv2.imwrite(os.path.join(cases_dir, f"{prefix}_full.jpg"), img)
    
    # Remove raw from rk/
    if os.path.exists(raw_path) and raw_path != clean_rk_path:
        try:
            os.remove(raw_path)
            print(f"Renamed {item['raw']} -> {item['clean']}")
        except Exception as e:
            print(f"Could not remove {raw_path}: {e}")
    else:
        print(f"Prepared {item['clean']}")

print("All 6 images successfully named, processed, and deployed!")
