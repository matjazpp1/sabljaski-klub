"""Iz izvirnega logotipa (public/logo/zelva-original.png) pripravi:
- zelva-svetla.png  (prosojno ozadje, svetlo besedilo – za temno glavo/nogo)
- zelva-prosojna.png (prosojno ozadje, izvirne barve)
- favicon.ico, apple-touch-icon.png, icon.png (samo želva)

Zagon: python3 scripts/logo-variante.py
"""
from PIL import Image
from collections import deque

SRC = "public/logo/zelva-original.png"
TEXT_X = 185  # levo od te meje je želva, desno besedilo

src = Image.open(SRC).convert("RGBA")
# izvirnik ima deloma belo, deloma prosojno ozadje – poenotimo na belo
im = Image.new("RGBA", src.size, (255, 255, 255, 255))
im.alpha_composite(src)
w, h = im.size
px = im.load()

def whiteness(p):
    return min(p[0], p[1], p[2])

# Zalivanje ozadja od robov: zelo svetle točke, povezane z robom, so ozadje.
bg = [[False] * h for _ in range(w)]
q = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
while q:
    x, y = q.popleft()
    if not (0 <= x < w and 0 <= y < h) or bg[x][y] or whiteness(px[x, y]) < 200:
        continue
    bg[x][y] = True
    q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

clear = im.copy()
light = im.copy()
cp, lp = clear.load(), light.load()
for x in range(w):
    for y in range(h):
        r, g, b, a = px[x, y]
        lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if bg[x][y]:
            cp[x, y] = (r, g, b, 0)
            lp[x, y] = (r, g, b, 0)
            continue
        if x >= TEXT_X:
            # besedilo: barvo zamenjaj s svetlo, prosojnost iz temnosti
            alpha = max(0, min(255, int((255 - lum) / (255 - 84) * 255)))
            cp[x, y] = (r, g, b, 255 if lum < 200 else alpha)
            lp[x, y] = (242, 244, 243, alpha)
        else:
            cp[x, y] = (r, g, b, a)
            lp[x, y] = (r, g, b, a)

clear.save("public/logo/zelva-prosojna.png", optimize=True)
light.save("public/logo/zelva-svetla.png", optimize=True)

# Ikona: samo želva (levi del), kvadratna
turtle = clear.crop((20, 14, 122, h - 8))  # brez meča in črt
bbox = turtle.getbbox()
turtle = turtle.crop(bbox)
side = max(turtle.size) + 8
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(turtle, ((side - turtle.width) // 2, (side - turtle.height) // 2), turtle)
sq.resize((512, 512), Image.LANCZOS).save("public/icon.png", optimize=True)
sq.resize((48, 48), Image.LANCZOS).save("public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
apple = Image.new("RGBA", (side, side), (255, 255, 255, 255))
apple.paste(sq, (0, 0), sq)
apple.convert("RGB").resize((180, 180), Image.LANCZOS).save("public/apple-touch-icon.png", optimize=True)
print("OK", bbox)
