import subprocess
import json
import time

class MCPClient:
    def __init__(self):
        self.p = subprocess.Popen(
            [r'C:\Users\golde\AppData\Local\Programs\Pencil\resources\app.asar.unpacked\out\mcp-server-windows-x64.exe', '--app', 'desktop'],
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )
        self.msg_id = 1
        
        req = {
            'jsonrpc': '2.0', 
            'id': self.msg_id, 
            'method': 'initialize', 
            'params': {
                'protocolVersion': '2024-11-05', 
                'capabilities': {}, 
                'clientInfo': {'name': 'cli', 'version': '1.0'}
            }
        }
        self.p.stdin.write(json.dumps(req) + '\n')
        self.p.stdin.flush()
        self.wait_for_response(self.msg_id)
        
        req2 = {'jsonrpc': '2.0', 'method': 'notifications/initialized'}
        self.p.stdin.write(json.dumps(req2) + '\n')
        self.p.stdin.flush()
        
    def wait_for_response(self, target_id):
        while True:
            line = self.p.stdout.readline()
            if not line: return None
            try:
                msg = json.loads(line)
                if msg.get('id') == target_id:
                    return msg.get('result')
            except:
                pass

    def call_tool(self, name, args):
        self.msg_id += 1
        req = {
            'jsonrpc': '2.0',
            'id': self.msg_id,
            'method': 'tools/call',
            'params': {
                'name': name,
                'arguments': args
            }
        }
        self.p.stdin.write(json.dumps(req) + '\n')
        self.p.stdin.flush()
        return self.wait_for_response(self.msg_id)

client = MCPClient()

state = client.call_tool('get_editor_state', {'include_schema': False})
print("Initial State:", state)

print("Opening new document...")
res = client.call_tool('open_document', {'filePathOrTemplate': 'new'})
print("Open:", res)

time.sleep(1)
state = client.call_tool('get_editor_state', {'include_schema': False})
print("New State:", state)

ops = """
container=I("document", {type: "frame", layout: "vertical", gap: 32, padding: 64, width: 1200, height: 800, fillColor: "#12100e"})
header=I(container, {type: "frame", layout: "horizontal", gap: 24, width: "fill_container", height: "hug_contents"})
title=I(header, {type: "text", content: "Aze. Aesthetic Layout", fontSize: 24, textColor: "#e8e2d2", fontWeight: "bold"})

main=I(container, {type: "frame", layout: "horizontal", gap: 64, width: "fill_container", height: "fill_container"})

left=I(main, {type: "frame", layout: "vertical", gap: 24, width: "fill_container", height: "fill_container"})
subtitle=I(left, {type: "text", content: "ABOUT ME", fontSize: 12, textColor: "#8c8374", fontFamily: "monospace"})
headline=I(left, {type: "text", content: "A bit about who I am", fontSize: 48, textColor: "#e8e2d2"})
desc=I(left, {type: "text", content: "I'm a multidisciplinary creator who moves between code editors and sketchbooks with equal comfort.", fontSize: 16, textColor: "#8c8374"})

right=I(main, {type: "frame", layout: "vertical", gap: 24, width: "fill_container", height: "fill_container"})
imageFrame=I(right, {type: "rectangle", width: "fill_container", height: 320, cornerRadius: 8})
G(imageFrame, "ai", "dark moody architectural photo minimalist black and white")

statsGrid=I(right, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container", height: "hug_contents"})
stat1=I(statsGrid, {type: "frame", layout: "vertical", gap: 8, padding: 24, width: "fill_container", fillColor: "#1a1816", cornerRadius: 8, strokeColor: "#333", strokeThickness: 1})
s1Num=I(stat1, {type: "text", content: "30+", fontSize: 32, textColor: "#e8e2d2"})
s1Label=I(stat1, {type: "text", content: "SKETCHES", fontSize: 10, textColor: "#8c8374"})

stat2=I(statsGrid, {type: "frame", layout: "vertical", gap: 8, padding: 24, width: "fill_container", fillColor: "#1a1816", cornerRadius: 8, strokeColor: "#333", strokeThickness: 1})
s2Num=I(stat2, {type: "text", content: "4+", fontSize: 32, textColor: "#e8e2d2"})
s2Label=I(stat2, {type: "text", content: "PROJECTS", fontSize: 10, textColor: "#8c8374"})
"""

print("Executing batch_design...")
res2 = client.call_tool('batch_design', {'filePath': '', 'operations': ops})

if 'content' in res2:
    for c in res2['content']:
        print("Design result:", c.get('text', ''))
else:
    print("Design result:", res2)
