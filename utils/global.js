import { GatewayIntentBits, PermissionFlagsBits } from "discord.js"

export function color() {
  return '#0ffb81'
}

export function embedFooter() {
  return {
    text: 'Folt  ·  0.1',
    iconURL: 'https://cdn.discordapp.com/attachments/1104025092700262473/1158432596867428452/folt-logo.png?ex=651c39ed&is=651ae86d&hm=214506cd64b52376518c98e8846bbb01ee50030001e4dbe6fe79847e1f592a46&'
  }
}

export async function usersWithPerm(users, perm=PermissionFlagsBits.Administrator) {
  users = users.map(u => {
    if(u.permissions.has(perm)) {
      return u
    } else {
      return null
    }
  })
  users = users.filter(e => e != null)
  return users
}