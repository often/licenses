addEventListener('load', async () => {
	let select = document.querySelector('select')
	let div = document.querySelector('div')
	let response = await fetch('https://api.github.com/licenses')
	let data = await response.json()

	for (let {name, url} of data)
	{
		let option = document.createElement('option')
		option.value = url
		option.textContent = name
		select.append(option)
	}

	select.addEventListener('change', async () => {
		div.textContent = ''

		response = await fetch(select.value)
		data = await response.json()

		let h2 = document.createElement('h2')
		h2.textContent = `${data.name} (${data.spdx_id})`
		div.append(h2)

		let p = document.createElement('p')
		p.textContent = data.description
		div.append(p)

		h2 = document.createElement('h2')
		h2.textContent = 'Implementation'
		div.append(h2)

		p = document.createElement('p')
		p.textContent = data.implementation
		div.append(p)

		h2 = document.createElement('h2')
		h2.textContent = 'Permissions'
		div.append(h2)

		p = document.createElement('p')
		p.textContent = data.permissions.join(', ')
		div.append(p)

		h2 = document.createElement('h2')
		h2.textContent = 'Conditions'
		div.append(h2)

		p = document.createElement('p')
		p.textContent = data.conditions.join(', ')
		div.append(p)

		h2 = document.createElement('h2')
		h2.textContent = 'Limitations'
		div.append(h2)

		p = document.createElement('p')
		p.textContent = data.limitations.join(', ')
		div.append(p)

		h2 = document.createElement('h2')
		h2.textContent = 'License text'
		div.append(h2)

		let button = document.createElement('button')
		button.textContent = 'copy to clipboard'
		div.append(button)

		button.addEventListener('click', async () => {
			await navigator.clipboard.writeText(data.body)
			button.textContent = 'copied to clipboard'

			setTimeout(() => {
				button.textContent = 'copy to clipboard'
			}, 1000)
		})

		let pre = document.createElement('pre')
		pre.textContent = data.body
		div.append(pre)
	})
})
