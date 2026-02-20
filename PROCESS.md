What I built is an MCP server that uses Claude code and hosts a tool that can be used to verify whether a 
URL is valid. Claude code helped by doing the brunt of the setup on the server and was very useful in 
debugging why some commands weren't working during the setup. I was having issues connecting Claude code to 
the server to allow it to use the tool. I opened Claude code back up and provided it with the command I used, 
and it told me that it was likely a scope issue. It provided me with a new command that would account for 
this, and after using that one it worked properly. I've learned that MCP servers are not as daunting to set 
up as they seem, that they can host many useful tools, and that it should be very possible to set up a server 
that has lots of different functions that I could reference throughout several projects. I also learned how 
to document this process.