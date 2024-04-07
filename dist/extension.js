var e=require("vscode");function b(s){let r=e.commands.registerCommand("duplicate-and-paste.DuplicateAndPaste",function(){e.env.clipboard.readText().then(a=>{let d=a.split(/\r?\n/),n=e.window.activeTextEditor;if(n){let l=n.document.eol===e.EndOfLine.CRLF?`\r
`:`
`,c=n.selection.active,t=n.document.lineAt(c.line),i=t.text,o=c.character,u=new e.Range(t.range.start,t.range.end);n.edit(p=>{let m=d.reduce((g,v)=>g+i.slice(0,o)+v+i.slice(o)+l,"");p.replace(u,m)})}})});s.subscriptions.push(r)}function f(){}module.exports={activate:b,deactivate:f};
