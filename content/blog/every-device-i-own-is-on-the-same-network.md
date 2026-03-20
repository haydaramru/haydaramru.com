---
title: Every Device I Own Is on the Same Network
date: 2026-02-06
excerpt:
published: true
---
A while back I was trying to SSH into my VPS from a coffee shop and ran into the usual nonsense. The IP changed because I'd rebuilt the server. I can't remember if I'd updated my SSH config. The wifi was doing something weird with ports. It took me like 20 minutes to get a connection that should have been instant.

Around the same time, I was also dealing with a dumb problem at home. I had a Raspberry Pi running some services on my local network and I wanted to access them from my laptop when I wasn't home. The "proper" way to do this involved port forwarding, dynamic DNS, firewall rules, and a bunch of other stuff I didn't want to maintain.

Then I found [Tailscale](https://tailscale.com). I installed it and honestly will never looked back.

## What Tailscale actually is

Tailscale is a mesh VPN built on [WireGuard](https://www.wireguard.com). But, calling it a "VPN" kind of undersells it. It's more like, all the devices are on the same local network, no matter where they physically are.

I install the Tailscale client on each device, sign in, and they can all talk to each other directly. Peer-to-peer, encrypted, no port forwarding, no config files. My laptop at a coffee shop, my VPS in Singapore, my Pi at home, and my phone on cellular. All on one network.

The free tier gives you up to 100 devices and 3 users, which is way more than enough for personal use.

## The moment it clicked for me

After installing Tailscale on my Mac and my VPS, I ran `tailscale status` and saw both machines listed with their Tailscale IPs. I did `ssh haydar@100.x.x.x` and I was in. No fumbling with public IPs, no firewall rules, nothing.

But then I learned about MagicDNS and that's when it really clicked. With MagicDNS enabled, Tailscale automatically gives each device a human-readable DNS name based on its hostname. So instead of remembering IP addresses, I just do:

```bash
ssh haydar@vps
```

That's it. From anywhere. It just works.

## My current setup

Over the past few months I've added basically everything to my tailnet. Here's what's on it right now:

- My MacBook (daily driver)
- A VPS running Ubuntu (dev server, some self-hosted stuff)
- A Raspberry Pi at home (running a few services)
- My phone (Android, mostly for quick SSH sessions via Termux)

The install process is the same everywhere. On Mac it's `brew install tailscale`, on Ubuntu it's their install script, on Android it's just the Play Store app. Each device shows up in the admin console and on the network within seconds.

## SSH without the headaches

This is the thing I use most. Before Tailscale, SSH-ing into remote machines meant dealing with public IPs, keeping SSH configs updated, and hoping nothing changed since the last time I connected. Now every machine on my tailnet is reachable by name.

I updated my `~/.ssh/config` to use Tailscale hostnames:

```
Host my-vps
    HostName vps
    User haydar
    IdentityFile ~/.ssh/id_ed25519
```

That works from my Mac, from Termux on my phone, from anywhere. If the machine is online and on my tailnet, I can reach it without public IP needed.

Tailscale also has its own SSH feature (Tailscale SSH) that lets me skip managing SSH keys entirely and authenticate through Tailscale identity system instead. I haven't fully switched to that yet, but it's nice to know it's there.

## Accessing self-hosted stuff remotely

This is the other big one. I have a few services running on my Pi and my VPS. Things like dashboards, a small database, and dev tools. Before Tailscale, accessing these from outside the local network was a whole project involving reverse proxies, dynamic DNS, and SSL certs.

Now I just access them by Tailscale IP or MagicDNS name. If I have a service running on port 3000 on my Pi, I just go to `http://rpi:3000` from my laptop. Even when my laptop is on a completely different network.

No ports exposed to the public internet. No nginx config for every little thing. It just feels like everything is local.

## Sharing files between devices

Tailscale has this feature called Taildrop that lets you send files between your devices. It's peer-to-peer and encrypted, and you don't need to set up anything extra. You enable it in the admin console and you're good.

On Mac, you right-click a file and share it to another device on your tailnet. On Android it works through the Tailscale app. On Linux you use the CLI. It's not something I use every day, but when I need to move a file from my phone to my laptop or from my VPS to my Mac, it's way easier than setting up scp or uploading to some cloud service.

There's also Taildrive, which goes a step further. You can share entire folders from one device and access them from any other device on your tailnet. I've been using this to share a folder on my VPS so I can browse it from my Mac without SSHing in every time.

## The ACL stuff

By default, every device on your tailnet can talk to every other device. That's fine when it's just your personal machines. But Tailscale also has an ACL (Access Control List) system where you can define exactly who can access what.

I haven't gone deep into this yet since it's just my own devices. But if you're sharing your tailnet with other people or want to lock things down more tightly, the ACL system uses a JSON policy file that lives in the admin console. You can do things like "my phone can only access the VPS on port 22" or "tagged servers can talk to each other but not to my personal devices."

It's there when I need it. For now, the defaults work fine.

## Things I wish I knew earlier

A few things I learned the hard way or didn't realize at first:

**MagicDNS needs to be enabled.** Newer tailnets have it on by default, but if yours doesn't, go to the DNS page in the admin console and turn it on. It makes everything so much nicer.

**Tailscale doesn't route all your traffic by default.** It only routes traffic destined for your tailnet. Your regular internet traffic still goes through your normal connection. If you _want_ to route everything through a specific machine (like using your VPS as an exit node), you can set that up, but it's opt-in.

**The admin console is actually useful.** I ignored it for a while and just used the CLI. But the web console shows you all your devices, their last seen time, their IPs, and lets you manage DNS, ACLs, and features like Taildrop. Worth checking out.

**It works on basically everything.** Mac, Windows, Linux, iOS, Android, Synology NAS, even in Docker containers. I haven't found a device I couldn't install it on.

## Is it worth it?

If you have more than one machine and you ever need to connect them, yes. Absolutely. The amount of time I used to spend messing with SSH configs, port forwarding, and firewall rules is now basically zero. Everything is just _there_, on one network, accessible by name.

The free tier is generous enough that I haven't even thought about upgrading. 100 devices is a lot. And the setup on each machine takes maybe two minutes.

It's one of those tools where after using it for a week, you can't imagine going back to the way things were before.