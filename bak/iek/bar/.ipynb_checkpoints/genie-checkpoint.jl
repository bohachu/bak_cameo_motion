using Genie, Genie.Router, Genie.Requests, Genie.Renderer.Json
Genie.config.run_as_server = true
Genie.config.cors_headers["Access-Control-Allow-Origin"] = "http://localhost:8866"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"] ="GET,POST,PUT,DELETE,OPTIONS" 
Genie.config.cors_allowed_origins = ["*"]
Genie.serve(".", 8866, "0.0.0.0", async = false, verbose = true)
