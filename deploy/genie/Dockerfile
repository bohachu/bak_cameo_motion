#TODO
FROM

RUN wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.3-linux-x86_64.tar.gz \
	&& tar xvfz julia-1.5.3-linux-x86_64.tar.gz \
	&& echo export PATH="/home/cameo/julia-1.5.3/bin:$PATH" >> ~/.bashrc \
	&& /bin/bash -c "source ~/.bashrc" \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("CSV")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("Pandas")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("DataFrames")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("PkgTemplates")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("HTTP")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("PyCall")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("JSON")' \
	# && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("Dates")' \
	&& /home/cameo/julia-1.5.3/bin/julia -e 'using Pkg; Pkg.add("IJulia"); using IJulia; notebook(detached=true)' \
    && /home/cameo/julia-1.5.3/bin/julia -e 'import Pkg; Pkg.add("PackageCompiler");using PackageCompiler;Pkg.add("Genie");@time using Genie;@time PackageCompiler.create_sysimage(:Genie; replace_default=true)' \
    && /home/cameo/julia-1.5.3/bin/julia -e 'using Pkg;Pkg.add("Interact");Pkg.add("IJulia");Pkg.add("WebIO")' \
    && /home/cameo/julia-1.5.3/bin/julia -e 'using WebIO; using Interact; WebIO.install_jupyter_labextension();'

# cd
# [CMD]
# nohup /usr/local/bin/julia /home/bohachu/cameo_motion/genie/genie.jl &