<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchSpaceData } from '$lib/api';
    import NewsScroller from '/src/NewsScroller.svelte';
    import TypeTitle from '/src/TypeTitle.svelte';
    import { fade } from 'svelte/transition';
    import {chartRender} from '/src/lib/Actions/chartRender'
    import {BarData} from '/src/lib/data/chartData.js';

    import noStation from '/src/lib/images/noStation.webp';
    import Alpha_Centauri from '/src/lib/images/Alpha Centauri.webp';
    import Beta_Hydri from '/src/lib/images/Beta Hydri.webp';
    import Gamma_Draconis from '/src/lib/images/Gamma Draconis.webp';
    import Delta_Pavonis from '/src/lib/images/Delta Pavonis.webp';
    import Epsilon_Indi from '/src/lib/images/Epsilon Indi.webp';

    let station = '';
    let artifact = '';
    let historic = false;
    let data: any = null;
    let loading = false;
    let error = '';
    let name = '';
    let nameNote = '';
    let nameCheck = false;
    let chartShow = false;
    const averageCalc = array => array.reduce((a, b) => a + b) / array.length;

    const stations = ['Alpha Centauri', 'Beta Hydri', 'Gamma Draconis', 'Delta Pavonis', 'Epsilon Indi'];
    const artifacts = ['Gold', 'Silver', 'Food Rations', 'Water', 'Medicine', 'Steel', 'Platinum', 'Computer Chips', 'Fuel Cells', 'Alien Artifacts', 'Spice', 'Rare Gems'];

    async function loadData() {
        loading = true;
        error = '';
        try {
            const query = new URLSearchParams();
            if (station) query.append('station', station);
            if (artifact) query.append('artifact', artifact);
            if (historic) query.append('historic', 'true');

            const res = await fetch(`/api?${query}`);
            if (!res.ok) throw new Error(await res.text());

            data = await res.json();
        } catch (e) {
            error = 'Failed to load data.';
            console.error(e);
        } finally {
            loading = false;
        }
    }

    function handleName() {
        if (name.toLowerCase() == 'your name' || name.toLowerCase() == 'yourname') {
            nameNote = "very funny, try again";
            name = '';
        }
        else if (name.toLowerCase() == 'try again') {
            nameNote = "Please just enter your name";
            name = '';
        }
        else if (name.trim() == '') {
            nameNote = "Please enter your name";
            name = '';
        }
        else {
            nameCheck = true;
        }
    }
    function drawChart(dataPoints, itemName, locationName) {
        BarData.data.datasets[0].data = dataPoints;
        BarData.data.datasets[0].label = itemName;
        BarData.options.plugins.title.text = locationName + " - Price History";
        chartShow = true;
    }

</script>

{#if nameCheck}
<main transition:fade={{ delay:1000, duration:1000 }}>
    <h1>Space Station Trading System</h1>
    <h2>Welcome {name}</h2>

    <div class="station-image-container">
        {#if station == "Alpha Centauri"}
        <img src="{Alpha_Centauri}" alt={station} />
        {:else if station === "Beta Hydri"}
        <img src="{Beta_Hydri}" alt={station} />
        {:else if station === "Gamma Draconis"}
        <img src="{Gamma_Draconis}" alt={station} />
        {:else if station === "Delta Pavonis"}
        <img src="{Delta_Pavonis}" alt={station} />
        {:else if station === "Epsilon Indi"}
        <img src="{Epsilon_Indi}" alt={station} />
        {:else}
        <img src="{noStation}" alt="No station selected" />
        {/if}
    </div>

    <div class="filters">
        <label>
            Station:
            <select bind:value={station}>
                <option value="">All</option>
                {#each stations as s}
                    <option value={s}>{s}</option>
                {/each}
            </select>
        </label>

        <label>
            Artifact:
            <select bind:value={artifact}>
                <option value="">All</option>
                {#each artifacts as a}
                    <option value={a}>{a}</option>
                {/each}
            </select>
        </label>

        <label>
            <input class="history-checkbox" type="checkbox" bind:checked={historic} />
            Show 10-day Price History
        </label>

        <button on:click={loadData}>Check Price</button>
    </div>

    <div class="data-container">
    {#if loading}
        <p>Loading data...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else if data}
        {#each data as d, i}
            <p class="results-location-name">{data[i].name}</p>
            <div class="results-location-box">
                {#each data[i].artifacts as dA, iA}
                    <div class="results-artifact-box">
                        <p class="results-artifact-price">{data[i].artifacts[iA].name} - <strong>{data[i].artifacts[iA].price}</strong> credits</p>
                        {#if historic && data[i].artifacts[iA].history}
                            <div>
                                <div class="chart-box">
                                    <p>10 Day Price History:</p>
                                    <p>
                                    {#each data[i].artifacts[iA].history as ah, ih}
                                        Day {ih + 1}: <strong>{ah}</strong> credits<br> 
                                    {/each}
                                    </p>
                                    <p>
                                        10 day average: <strong>{averageCalc(data[i].artifacts[iA].history)}</strong> credits<br>
                                        Low Price: <strong>{Math.min(...data[i].artifacts[iA].history)}</strong> credits<br>
                                        High Price: <strong>{Math.max(...data[i].artifacts[iA].history)}</strong> credits
                                    </p>
                                    <button on:click={() => drawChart(data[i].artifacts[iA].history, data[i].artifacts[iA].name, data[i].name)}>Chart View</button>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
    </div>
    <NewsScroller />
    {#if chartShow}
        <div class="chart-bg" on:click={() => chartShow = false}>
            <div class="chart-container">
                <p class="chart-close" on:click={() => chartShow = false}>X</p>
                <canvas use:chartRender={BarData}></canvas>
            </div>
        </div>
    {/if}
</main>

{:else}
<div class="intro-screen" transition:fade={{ delay:0, duration:1000 }}>
    <TypeTitle />
    <p class="namenote">{nameNote}</p>
    <input bind:value={name} />
    <button type="submit" on:click={handleName}>Enter</button>
</div>
{/if}

<style>
    :global(body) {
        margin: 0;
        background-size: 20px 20px;
        background-image:
            linear-gradient(to right, rgb(27, 27, 27) 1px, transparent 1px), 
            linear-gradient(to bottom, rgb(27, 27, 27) 1px, transparent 1px);
        background-color: #000;
    }

    main {
        font-family: 'Orbitron', sans-serif;
        padding: 2rem;
        text-align: center;
        h1 {
            color: #f79225;
            @media only screen and (max-width: 500px) {
                font-size: 22px;
            }
        }
        h2 {
            color: #f79225;
        }
        .station-image-container {
            border: 2px solid #f79225;
            width: 400px;
            height: 400px;
            max-width: 100%;
            max-height: calc(100vw - 4rem);
            margin: auto auto 40px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        label {
            color: #f79225;
        }
        select {
            font-family: 'Orbitron', sans-serif;
            background: #000;
            border: 1px solid #f79225;
            color: #f79225;
        }
        .history-checkbox {
            accent-color: #076cda;
            filter: invert(100%);
        }
        .data-container {
            color: #f79225;
            margin-bottom: 100px;
            .results-location-name {
                font-size: 25px;
            }
            .results-location-box {
                border: 1px solid #f79225;
                max-width: 700px;
                width: 100%;
                margin: auto;
                .results-artifact-box {
                    border: 1px solid #f79225;
                    max-width: 585px;
                    width: 100%;
                    margin: auto;
                    padding: 0 5px 20px;
                    box-sizing: border-box;
                }
                .results-artifact-price {
                    font-size: 22px;
                }
            }
        }
    }

    .filters {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    button {
        width: fit-content;
        padding: 0.5rem 1rem;
        background: #f79225;
        font-family: 'Orbitron', sans-serif;
        cursor: pointer;
        border: 0;
        transition: .3s;
        border: 1px solid #f79225;
        color: #000;
    }
    button:hover {
        opacity: .8;
        background: transparent;
        color: #f79225;
    }

    .error {
        color: red;
    }

    pre {
        background: #f0f0f0;
        padding: 1rem;
        overflow: auto;
        border-radius: 4px;
    }
    .intro-screen {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Orbitron', sans-serif;
        :global(h3) {
            color: #f79225;
            font-size: 25px;
            @media only screen and (max-width: 700px) {
                font-size: 22px;
            }
            @media only screen and (max-width: 500px) {
                font-size: 18px;
            }
        }
        input {
            font-family: 'Orbitron', sans-serif;
            margin-bottom: 10px;
            background: #000;
            border: 1px solid #f79225;
            color: #f79225;
        }
        .namenote {
            color: orangered;
        }
    }
    .chart-bg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .65);
        .chart-container {
            background: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 1000px;
            height: 75%;
            max-height: 500px;
            padding: 20px;
            filter: invert(.93);
            .chart-close {
                position: absolute;
                right: -20px;
                top: -20px;
                margin: 0;
                font-weight: 700;
                font-size: 30px;
                border: 2px solid #076cda;
                border-radius: 50%;
                padding: 5px;
                width: 35px;
                height: 35px;
                line-height: 35px;
                color: #076cda;
                background: #fff;
                cursor: pointer;
                transition: .3s;
                @media only screen and (max-width: 800px) {
                    right: 5px;
                }
            }
            .chart-close:hover {
                opacity: .8;
                background: #076cda;
                color: #fff;
            }
        }
    }
</style>