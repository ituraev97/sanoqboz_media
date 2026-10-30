"""build.py EP -> pipeline/render.html for that episode (episode.js + caps/env)"""
import sys,os
D=os.path.dirname(os.path.abspath(__file__));EP=sys.argv[1]
t=open(f'{D}/template.js').read()
t=t.replace('__EPISODE__',open(f'{EP}/episode.js').read()).replace('__ENV__',open(f'{EP}/env.json').read()).replace('__CAPS__',open(f'{EP}/caps.json').read()).replace('__FRAMEWORK__',open(f'{D}/fw.part').read()).replace('__BUBBLE__',open(f'{D}/bubble.part').read())
open(f'{D}/render.html','w').write(open(f'{D}/base.part').read()+t+"\n</script></body></html>\n")
print('ok')
