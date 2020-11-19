import ipywidgets as widgets
from IPython.display import display
def add(a,b):
    w = widgets.IntSlider()
    display(w)    
    return a+b+111
