import sys, glob, os
sys.path.insert(0, 'tools')
from key_cartoon import key
from PIL import Image
SRC = '/home/ubuntu/.cursor/projects/home-ubuntu-Documents-Romuald-V-Overlord/assets'
def run(f):
    n = os.path.basename(f)[3:-4]
    tmp = f'/tmp/w/cw_{n}.png'
    key(f, tmp, 500)
    im = Image.open(tmp)
    im.thumbnail((192, 192), Image.LANCZOS)
    im.save(f'assets/real/armes/{n}.png')
    print(n, im.size)
if __name__ == '__main__':
    run(sys.argv[1])
