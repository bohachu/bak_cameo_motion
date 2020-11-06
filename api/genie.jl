using Genie, Genie.Router, Genie.Requests, Genie.Renderer, Genie.Renderer.Html, Genie.Renderer.Json
import JSON

int_port=18866
str_vm="cameo-motion-3"

ary_gcp機器列表=split(read(`gcloud compute instances list`,String),"\n")
str_本機外部IP=[split(i,r" +") for i in ary_gcp機器列表 if occursin(str_vm,i)][1][6]
str_url="""http://$(str_本機外部IP):$(int_port)/jl?jl=請列出數據動圖模板有哪些.jl&fn=請列出數據動圖模板有哪些&params=["abc","123","中文",456]"""
println(str_url)

route("/hi") do
    html("Hi, Welcome to Genie!")
end

route("/jl") do
    str_jl=@params(:jl)
    str_fn=@params(:fn)
    str_params=@params(:params)
    ary=JSON.parse(str_params)
    println("ary: $(ary)")
    include(str_jl)
    str_result=getfield(Main, Symbol(str_fn))(ary)
    html(str_result)
end

Genie.config.run_as_server=true
Genie.config.cors_headers["Access-Control-Allow-Origin"]="http://localhost:$(int_port)"
Genie.config.cors_headers["Access-Control-Allow-Headers"]="Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"]="GET,POST,PUT,DELETE,OPTIONS" 
Genie.config.cors_allowed_origins=["*"]
up(int_port,"0.0.0.0",async=false,verbose=true)
