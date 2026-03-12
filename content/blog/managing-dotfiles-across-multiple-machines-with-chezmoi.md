---
title: Managing Dotfiles Across Multiple Machines with Chezmoi
date: 2026-03-12
excerpt: If you've ever set up a new machine and spent an hour recreating your `.zshrc` from memory, then chezmoi is for you.
published: true
---
If you've ever set up a new machine and spent an hour recreating your `.zshrc` from memory — copy-pasting aliases, re-adding PATH exports, wondering why you didn't write this down — then chezmoi is for you.

Chezmoi is a dotfile manager that lets you version-control your config files and sync them across machines. But what makes it stand out isn't just the syncing. It's the **templating**.

---

## The Problem with "Just Symlink Everything"

The classic approach is to keep your dotfiles in a Git repo and symlink them. It works — until you have machines with different setups.

Your Mac has Homebrew. Your VPS runs Ubuntu. Your Raspberry Pi is ARM. Your phone runs Termux. One `.zshrc` can't realistically serve all of them without turning into a mess of `if uname | grep -q Darwin` checks scattered everywhere.

Chezmoi solves this cleanly.

---

## How Chezmoi Works (The Short Version)

Chezmoi keeps your dotfiles in a **source directory** (`~/.local/share/chezmoi`), separate from where they actually live (`~/.zshrc`, `~/.gitconfig`, etc). When you run `chezmoi apply`, it renders the source files and writes them to the right place.

The key commands you'll use daily:

```bash
chezmoi add ~/.zshrc        # start tracking a file
chezmoi edit ~/.zshrc       # edit the source (not the actual file)
chezmoi diff                # preview what would change
chezmoi apply               # apply changes to your home directory
chezmoi update              # git pull + apply in one step
```

Your source directory is a normal Git repo. Push it to GitHub, pull it on another machine, run `chezmoi apply` — done.

---

## Templating: The Real Power

Here's where it gets interesting. Rename any file to end in `.tmpl` and chezmoi will treat it as a Go template before writing it out.

So instead of one bloated `.zshrc` that tries to handle every OS, you write one template that renders differently per machine:

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

When chezmoi renders this on your Mac, the Linux and Android blocks simply don't appear. Each machine gets a clean, minimal `.zshrc` with only what it needs.

Chezmoi exposes a bunch of useful variables out of the box:

|Variable|Example value|
|---|---|
|`.chezmoi.os`|`darwin`, `linux`, `android`|
|`.chezmoi.arch`|`amd64`, `arm64`|
|`.chezmoi.hostname`|`macbook-pro`, `my-vps`|
|`.chezmoi.homeDir`|`/home/haydar`|

You can even branch logic by hostname — handy if two Linux machines still need different configs.

---

## Machine-Specific Secrets with `.zshrc.local`

Some things shouldn't live in a Git repo. Database passwords, API keys, Redis credentials — these are machine-specific and secret.

The pattern I use is a local override file. In the template, I add:

```zsh
# Local overrides — not managed by chezmoi
[[ -f ~/.zshrc.local ]] && source ~/.zshrc.local
```

Then on any machine that needs it, I create `~/.zshrc.local` manually:

```zsh
# Redis (this VPS only)
export REDIS_HOST="localhost"
export REDIS_PORT="6379"
export REDIS_PASSWORD="super-secret"
```

This file is never added to chezmoi, never pushed to Git. It just quietly gets sourced when the shell starts. Simple, zero overhead.

If you need something more robust, chezmoi also supports encrypted files and integrations with secret managers like 1Password or Bitwarden — but for most use cases, `.zshrc.local` is plenty.

---

## Getting Started

```bash
# Install (Mac)
brew install chezmoi

# Install (Linux)
sh -c "$(curl -fsLS get.chezmoi.io)"

# Initialize
chezmoi init

# Add your zshrc
chezmoi add ~/.zshrc

# Edit and convert to a template
mv ~/.local/share/chezmoi/dot_zshrc ~/.local/share/chezmoi/dot_zshrc.tmpl
chezmoi edit ~/.zshrc

# Preview before applying
chezmoi diff

# Apply
chezmoi apply
```

On a new machine, if your dotfiles are already on GitHub:

```bash
chezmoi init --apply https://github.com/yourusername/dotfiles
```

One command. Everything set up.

---

## Worth It?

If you only have one machine, probably overkill. But the moment you're managing two or more — a laptop, a server, a Pi — chezmoi pays for itself. You stop manually syncing configs, stop worrying about which machine has the "latest" version of your aliases, and start treating your dotfiles like the code they are.

It took me an afternoon to migrate. I haven't thought about it since.
