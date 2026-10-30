import sys,glob,os
from PIL import Image
d,out=sys.argv[1],sys.argv[2];fs=sorted(glob.glob(d+'/*.jpg'),key=lambda f:float(os.path.basename(f)[:-4]))
cols=int(sys.argv[3]) if len(sys.argv)>3 else 4;w,h=360,640;rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(cols*w,rows*h))
for i,f in enumerate(fs):S.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
S.save(out,quality=88)
