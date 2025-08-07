<script lang="ts">
    import { getAccessToken } from "../lib/globals";
    import { getServerURL } from "../lib/utils";

    let band: string = "10/11m (CB)";
    let frequency: number = 27.385;
    let mode: string = "LSB";
    let quality: number = 5;
    let strength: string = "S5";
    let callsign: string = "";
    let location: string = "";
    let notes: string = "";

    async function formHandler(e: SubmitEvent) {
        e.preventDefault();

        let conf = confirm("Are you sure you want to post this? Press OK to post!");

        if (!conf) return;

        let req = await fetch(
            `${getServerURL()}/logbook/new`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    band,
                    frequency,
                    mode,
                    quality,
                    strength,
                    callsign,
                    location,
                    notes
                })
            }
        );

        if (!req.ok) {
            let text = await req.text();
            alert("Failed to post! " + text);
            return;
        }

        alert("Posted!");
    }
</script>

<form class="flex flex-col border gap-1 p-2" on:submit={formHandler}>
    <div class="flex items-center justify-evenly">
        <div>
            <label for="band">Band:</label>
            <select name="band" class="bg-red-500 p-1 focus:outline-none" bind:value={band}>
                <option value="10/11m (CB)">10/11m (CB)</option>
                <option value="20m-40m">20m-40m</option>
                <option value="40m-80m">40m-80m</option>
            </select>
        </div>

        <div>
            <label for="frequency">Frequency (MHz):</label>
            <input type="number" step="any" name="frequency" class="focus:outline-none p-1 border" bind:value={frequency}>
        </div>

        <div>
            <label for="mode">Mode:</label>
            <select name="mode" class="bg-red-500 p-1 focus:outline-none" bind:value={mode}>
                <option value="AM">AM</option>
                <option value="FM">FM</option>
                <option value="LSB">LSB</option>
                <option value="USB">USB</option>
            </select>
        </div>
    </div>

    <div class="w-full h-[1px] bg-gray-500"></div>

    <div class="flex items-center justify-evenly">
        <div class="flex items-center">
            <label for="quality">Quality:</label>
            <input type="range" name="quality" min="0" max="10" bind:value={quality}>
        </div>

        <div>
            <label for="strength">Strength:</label>
            <select name="strength" class="bg-red-500 p-1 focus:outline-none" bind:value={strength}>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
                <option value="S7">S7</option>
                <option value="S8">S8</option>
                <option value="S9">S9</option>
                <option value="S9+10dB">S9+10dB</option>
                <option value="S9+20dB">S9+20dB</option>
                <option value="S9+30dB">S9+30dB</option>
            </select>
        </div>
    </div>

    <div class="w-full h-[1px] bg-gray-500"></div>

    <div class="flex items-center justify-evenly">
        <div>
            <label for="callsign">Callsign:</label>
            <input type="text" name="callsign" class="p-1 focus:outline-none border" bind:value={callsign}>
        </div>

        <div>
            <label for="location">Location:</label>
            <input type="text" name="location" class="p-1 focus:outline-none border" bind:value={location}>
        </div>
    </div>

    <div class="w-full h-[1px] bg-gray-500"></div>

    <div>
        <label for="notes">Additional Notes:</label>
        <textarea name="notes" class="w-full p-1 focus:outline-none border" bind:value={notes}></textarea>
    </div>
    
    <input type="submit" class="m-2 p-1 border rounded w-fit cursor-pointer" value="Post">
</form>