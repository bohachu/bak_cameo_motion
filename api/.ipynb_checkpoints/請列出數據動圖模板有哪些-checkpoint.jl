import JSON
function 請列出數據動圖模板有哪些(ary)
    ary_result::Array{String,1}=[
        "img/apex-column-line.png",
        "img/am-world-timeline.png"
    ]
    return JSON.json(ary_result)
end
println(請列出數據動圖模板有哪些([]))
