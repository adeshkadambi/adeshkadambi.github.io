---
title: utoronto thesis template
draft: 
tags:
---

![[ut-thesis-banner.png]]
I recently discovered Typst, ["a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use"](https://github.com/typst/typst), a few months ago and I've been absolutely loving it. The faster compilation and simpler syntax meant that things are more intuitive and I could be more productive at the same time. Here's a quick example...

> [!EXAMPLE]
> Let's say I want to define a quick function to double a number.
> 
> Using LaTeX, I would have to do something like:
> ```latex
> \ExplSyntaxOn 
> \cs_new:Npn \double #1 { 
> 	\int_eval:n { #1 * 2 } 
> }
> \ExplSyntaxOff 
> 
> The double of 5 is \double{5}.
> ```
> 
> But using Typst, all I have to do is:
> ```typst
> #let double(x) = x * 2 
> 
> The double of 5 is #double(5).
> ```

When I got around to finally drafting my thesis, I noticed the School of Graduate Studies at the University of Toronto only provided thesis templates in [Microsoft Word](https://www.sgs.utoronto.ca/wp-content/uploads/sites/253/2019/08/Thesis-Template_Aug.2019.docx) and [LaTeX](https://www.ctan.org/pkg/ut-thesis/). I know I said I loved Typst, but I didn't love it enough to make my own template. So I started writing using the LaTeX template in Overleaf. Fast forward a few months later and Overleaf [changed their free compile timeouts](https://www.overleaf.com/blog/changes-to-free-compile-timeouts-and-servers), which meant I could no longer compile my thesis (Figure 1).

![[compile-timeout.png]]
*Figure 1: Compile timeout on Overleaf.*

Now I know there are options to compile it locally but this was enough friction to ditch LaTeX altogether and spend a few hours making a template in Typst instead.

![[thesis-template.pdf]]

You can download the source code and start working on your own thesis [here](https://github.com/adeshkadambi/ut-thesis-typst/).

### Installation Instructions

1. Fork the repository.
2. Clone your forked repository:
```shell
git clone https://github.com/YOUR-USERNAME/ut-thesis-typst
```
3. If you have Typst installed:
```shell
# creates `main.pdf` in the current working dir
typst compile main.typ

# watches source and recompiles on changes (recommended)
typst watch main.typ
```

