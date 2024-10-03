const renderBridge = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/bridges')
    const data = await response.json()

    const giftContent = document.getElementById('bridge-content')

    let bridge

    bridge = data.find(bridge => bridge.id === requestedID)

    if (bridge) {
        document.getElementById('image').src = bridge.image
        document.getElementById('name').textContent = bridge.name
        document.getElementById('submittedBy').textContent = 'Submitted By: ' + bridge.submittedBy
        document.getElementById('cost').textContent = 'Cost: ' + bridge.cost
        document.getElementById('city').textContent = 'City: ' + bridge.city
        document.getElementById('description').textContent = bridge.description
        document.title = `World Bridges - ${bridge.name}`
      
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No image Available 😞'
        bridgeContent.appendChild(message)
    }

}

renderBridge()
