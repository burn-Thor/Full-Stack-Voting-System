class VotingSystem{
    constructor(root, title){
        this.root=root;
        this.selected = sessionStorage.getItem("pollOptionSelected");
        this.endpoint = "http://localhost:3000/poll";

        this.root.insertAdjacentHTML("afterbegin", `
        <div class="pollTitle">${title}</div>
        `)
    }
    async _refresh(){
        const response = await fetch(this.endpoint);
        const data = await response.json();

        console.log(data);
    }
    
}

const V = new VotingSystem(
    document.querySelector('.poll'),
    "Who get's Kirk Hammett's Monsters of Rock guitar?"
    )
    console.log(V)

