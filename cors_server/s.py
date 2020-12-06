#!/usr/bin/env python3
# encoding: utf-8
"""Use instead of `python3 -m http.server` when you need CORS"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()

str_ip='0.0.0.0'
int_port=18888
print(str_ip,int_port)
httpd = HTTPServer((str_ip, int_port), CORSRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile='./server2.pem', server_side=True)
httpd.serve_forever()

######
# # taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# # generate server.xml with the following command:
# #    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
# # run as follows:
# #    python simple-https-server.py
# # then in your browser, visit:
# #    https://localhost:4443

# import BaseHTTPServer, SimpleHTTPServer
# import ssl

# httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
# httpd.socket = ssl.wrap_socket (httpd.socket, certfile='./server.pem', server_side=True)
# httpd.serve_forever()

