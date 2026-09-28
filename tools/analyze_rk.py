import os
import shutil
from PIL import Image

rk_dir = r"C:\Users\Abhishek pandey\Desktop\cosmetic\rk"
public_rk = r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\rk"
os.makedirs(public_rk, exist_ok=True)

files = [f for f in os.listdir(rk_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
files.sort()
print(f"Total images found: {len(files)}")

# Copy to public/rk
for f in files:
    src = os.path.join(rk_dir, f)
    dst = os.path.join(public_rk, f)
    if not os.path.exists(dst):
        shutil.copy2(src, dst)

html = [
    "<!DOCTYPE html><html><head><meta charset='utf-8'>",
    "<style>",
    "body { font-family: system-ui, sans-serif; background: #0b1120; color: #f8fafc; padding: 24px; }",
    ".grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }",
    ".card { background: #1e293b; border-radius: 12px; padding: 12px; border: 1px solid #334155; }",
    "img { width: 100%; height: 260px; object-fit: contain; background: #000; border-radius: 8px; }",
    ".meta { font-size: 13px; margin: 8px 0; color: #94a3b8; }",
    ".badge { display: inline-block; background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; margin-bottom: 6px; }",
    "</style></head><body>",
    "<h1>RK Clinical Images Review (57 Photos)</h1>",
    "<div class='grid'>"
]

for i, f in enumerate(files):
    src = f"/rk/{f}"
    local_path = os.path.join(public_rk, f)
    with Image.open(local_path) as im:
        w, h = im.size
        ratio = round(w / h, 2)
    html.append(f"""
    <div class="card">
        <span class="badge">#{i+1}</span>
        <div class="meta"><b>{f}</b><br>Size: {w}x{h} (ratio: {ratio})</div>
        <img src="{src}" loading="lazy" />
    </div>
    """)

html.append("</div></body></html>")

with open(r"C:\Users\Abhishek pandey\Desktop\cosmetic\public\rk_preview.html", "w", encoding="utf-8") as fp:
    fp.write("\n".join(html))

print("Created public/rk_preview.html successfully.")
