using CSV

CSV.read("api.csv")

println("hihi")

println("wa le la")

using Interact
s = slider(1:100);
s[]
Interact.@on print(string("The value is ", &s))


px=widget(0:0.01:.3, label="px")
py=widget(0:0.01:.3, label="py")
plane = widget(Dict("x=0" => 1, "y=0" => 2), label="Section plane");
interactive_plot = map(plotsos, px, py, plane)
vbox(
    hbox(px, py, plane), # stack horizontally
    interactive_plot)




