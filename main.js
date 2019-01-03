const time = {}
const clock = () => {
  const fullDate = new Date()
  time.hours = fullDate.getHours()
  time.mins = fullDate.getMinutes()
  time.secs = fullDate.getSeconds()
  Object.keys(time).map(e => (time[e] < 10 ? (time[e] = '0' + time[e]) : null))
}

const { children } = document.getElementsByClassName('main')[0]

const templatingEngine = (store, children) => {
  const replace = childBranch => {
    const keys = Object.keys(store)
    const id = childBranch.id
    const found = keys.find(e => e === id)
    if (found && store[id] !== childBranch.innerHTML) {
      childBranch.innerHTML = store[id]
    }
  }
  for (let i = 0; i < children.length; i++) {
    const length = children[i].children.length
    if (length === 0) {
      replace(children[i])
    } else if (length > 0) {
      for (let j = 0; j < length; j++) {
        const nestedLength = children[i].children[j].children.length
        if (nestedLength > 0) {
          const nestedChildren = children[i].children[j].children
          templatingEngine(store, nestedChildren)
        } else {
          replace(children[i].children[j])
        }
      }
    }
  }
}
setInterval(clock, 1000)
setInterval(() => {
  templatingEngine(time, children)
}, 1000)
// templatingEngine(time, children)
