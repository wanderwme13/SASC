document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const priceTableBody = document.querySelector("#priceTable tbody");

    // Função para formatar valores em Reais (R$)
    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    // Carregar dados do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let items = data;

            // Função para exibir os itens na tabela
            function displayItems(items) {
                priceTableBody.innerHTML = "";
                items.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.Código}</td>
                        <td>${item.Descrição}</td>
                        <td>${formatarMoeda(item["MENOR VALOR"])}</td>
                        <td>${item["MENOR PREÇO"]}</td>
                        <td>${item.ATUALIZADO}</td>
                    `;
                    priceTableBody.appendChild(row);
                });
            }

            // Exibir todos os itens inicialmente
            displayItems(items);

            // Filtrar itens com base na pesquisa
            searchInput.addEventListener("input", function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredItems = items.filter(item => 
                    item.Código.toString().includes(searchTerm) || 
                    item.Descrição.toLowerCase().includes(searchTerm)
                );
                displayItems(filteredItems);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
