---
title: I Stopped Copy-Pasting My Dotfiles (and You Should Too)
date: 2026-03-12
excerpt:
published: true
---
So a few weeks ago I set up a fresh machine and spent like an hour recreating my `.zshrc` from memory. Copy-pasting aliases from old terminal logs, re-adding PATH exports, googling stuff I _know_ I've configured before. Halfway through I just sat there thinking, "why didn't I write this down somewhere?"

Turns out there's a tool for exactly this. It's called [chezmoi](https://www.chezmoi.io/).

## The setup that finally broke me

I have a Mac for daily use, a VPS running Ubuntu, and occasionally I mess around on a Raspberry Pi or Termux on my Android. For the longest time I kept my dotfiles in a Git repo and symlinked them into place. It works fine when all your machines are the same.

But mine aren't. My Mac needs Homebrew paths. My VPS needs completely different PATH exports. And my `.zshrc` slowly turned into this mess of `if uname | grep -q Darwin` checks everywhere. Every time I added something new, I had to think about which machine it would break on.

That's when I found chezmoi. I'd seen it mentioned a few times on Reddit and Hacker News, but what actually convinced me to try it was the templating. More on that in a bit.

## Getting started

The install was straightforward. On Mac it's just `brew install chezmoi`, on Linux there's a one-liner curl script. After that:

```bash
chezmoi init
chezmoi add ~/.zshrc
```

That copies your `.zshrc` into chezmoi's source directory (`~/.local/share/chezmoi`). From there you edit the source version, preview what would change, and apply it:

```bash
chezmoi edit ~/.zshrc       # edit the source copy
chezmoi diff                # see what would change
chezmoi apply               # write changes to your actual home directory
chezmoi update              # git pull + apply in one step
```

The source directory is just a normal Git repo. So I pushed it to GitHub, pulled it on my VPS, ran `chezmoi apply`, and everything was in place. No symlinks, no bootstrap scripts.

## Templating is what actually sold me

This is the part that made me go "oh, okay, this is worth it."

You rename any file to end in `.tmpl` and chezmoi treats it as a Go template. So instead of one giant `.zshrc` full of if-else blocks for each OS, you write something like:

```zsh
# Common for all machines
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

alias ll='ls -lah'

{{ if eq .chezmoi.os "darwin" -}}
# Mac-specific
export PATH="/opt/homebrew/opt/go@1.22/bin:$PATH"
source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
{{ end -}}

{{ if eq .chezmoi.os "linux" -}}
# Linux-specific (VPS, Raspberry Pi)
export PATH="$HOME/.local/bin:$PATH"
{{ end -}}

{{ if eq .chezmoi.os "android" -}}
# Termux
export PATH="$PREFIX/bin:$PATH"
{{ end -}}
```

When chezmoi renders this on my Mac, the Linux and Android blocks just disappear. Each machine gets a clean, minimal `.zshrc` with only the stuff it actually needs. No dead code sitting around.

Here are some of the variables chezmoi exposes that I find myself using the most:

|Variable|Example|
|---|---|
|`.chezmoi.os`|`darwin`, `linux`, `android`|
|`.chezmoi.arch`|`amd64`, `arm64`|
|`.chezmoi.hostname`|`mac`, `vps`, `rpi`|
|`.chezmoi.homeDir`|`/home/haydar`|

You can even branch by hostname, which is handy when two Linux machines still need different configs.

## How I handle secrets

Some things shouldn't live in a Git repo. Database passwords, API keys, anything sensitive. That kind of stuff is machine-specific and should stay local.

The pattern I landed on is dead simple. I just added this to my `.zshrc` template:

```zsh
# Local overrides, not managed by chezmoi
[[ -f ~/.zshrc.local ]] && source ~/.zshrc.local
```

Then on my VPS I created `~/.zshrc.local` by hand:

```zsh
# Redis (this VPS only)
export REDIS_HOST="localhost"
export REDIS_PORT="6379"
export REDIS_PASSWORD="super-secret"
```

This file never gets added to chezmoi and never gets pushed to Git. It just quietly gets sourced when the shell starts. Simple, no magic.

Chezmoi does support encrypted files and integrations with [1Password](https://1password.com/) or [Bitwarden](https://bitwarden.com/) if you need something more serious. I haven't needed that yet, but it's nice to know it's there.

## Setting up a new machine now takes one command

This is probably my favorite part. Once the dotfiles repo is on GitHub, spinning up a new machine is literally:

```bash
chezmoi init --apply https://github.com/haydaramru/dotfiles
```

One command. Everything lands exactly where it should, templated for that specific OS. No more hour-long setup sessions trying to remember what I had before.

## Was it worth it?

If you only have one machine, this is probably overkill. But the moment you're juggling two or more (a laptop, a server, a Pi, a phone running Termux), it pays for itself fast. I stopped manually syncing configs and started treating my dotfiles like the code they actually are.