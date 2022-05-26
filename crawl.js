import axios from "axios";
import q from "query-html";

async function start() {
    const words = ["kedi", "kapı", "ekmek"];
    const dictionary = [];
    for (const word of words) {
        console.log("word:", word);
        for await (const res of get_data(word)) {
            if (!res) {
                continue;
            }
            dictionary.push({key: word, value: res});
        }
    }
    console.clear();
    console.log("dict:", dictionary);
}

async function* get_data(word) {
    const html = await get_word_html(word);
    const table_start = html.indexOf("<TABLE width=60%");
    let row_start = 0;
    let row_end = table_start;

    while (true) {
        row_start = html.indexOf("<tr>", row_end);
        if (row_start === -1) {
            break;
        }
        row_end = html.indexOf("<tr>", row_start + 1);
        if (row_end === -1) {
            row_end = html.indexOf("</table>", row_start + 1);
        }
        const row = html.substring(row_start, row_end);
        const first_col_start = row.indexOf("<td", row.indexOf("<td") + 1);
        const first_col_end = row.indexOf("<td", first_col_start + 1);
        const first_col = row.substring(first_col_start, first_col_end) + "</td>";
        const second_col_start = row.indexOf("<td", first_col_end);
        const second_col_end = row.indexOf("<td", second_col_start + 1);
        const second_col = row.substring(second_col_start, second_col_end) + "</td>";

        try {
            const left_value = q(first_col).find("a").text;
            const right_value = q(second_col).find("span").text;
            if (right_value.trim() === word) {
                yield left_value.trim();
            } else {
                console.log("h1", right_value.trim(), word);
            }
        } catch (e) {
        }
    }
}

export async function get_word_html(word) {
    const response = await axios({
        method: 'post',
        url: 'https://pauctle.com/aztr/index.php',
        data: `searchterm=${word}&search.x=0&search.y=0&lang=AZ`,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "PHPSESSID=sim3sneajama5j34akbkk72g82",
            "Referer": "https://pauctle.com/aztr/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
    });
    return response.data;
}

await start();


