from flask import Flask, render_template, jsonify, send_file
import json
import requests
import os
import pydub

app = Flask(__name__)


def get_threads(board):
    search = "YGYL"
    fields = ["sub", "com"]
    found = []

    resp = requests.get("https://a.4cdn.org/"+board+"/catalog.json").json()
    for page in resp:
        for thread in page['threads']:
            for field in fields:
                if field in thread and search in thread[field]:
                    found.append(thread)
                    break

    return found

@app.route('/')
def homepage():
    ## GET THREADS

    wsg = get_threads("wsg")
    gif = get_threads("gif")
    return render_template("home.html", threads = {"wsg":wsg, "gif":gif})



@app.route("/play/<board>/<thread>")
def play_page(board, thread):
    resp = requests.get("https://a.4cdn.org/"+board+"/thread/"+thread+".json").json()
    posts = [post for post in resp['posts'] if 'ext' in post and post['ext'] == '.webm']
    if 'sub' in resp['posts'][0]:
        tname = resp['posts'][0]['sub']
    else:
        tname = thread

    print("tname", tname)

    return render_template("play.html", posts=json.dumps(posts), board=board, thread=thread, tname=tname)


@app.route("/mp3/<board>/<tim>")
def download_mp3(board, tim):
    url = "https://i.4cdn.org/"+board+"/"+tim+".webm"  # placeholder url
    data = requests.get(url).content
    filename = "static/webm/"+url.split("/")[-1]
    with open(filename, 'wb') as f:
        f.write(data)


    pydub.AudioSegment.converter = "ffmpeg"
    song = pydub.AudioSegment.from_file(filename)
    mp3name = "static/mp3/"+url.split("/")[-1].split(".")[0]+".mp3"
    song.export(mp3name, format="mp3")

    os.remove(filename)

    return send_file(mp3name, mimetype='audio/mpeg')



if __name__ == '__main__':
    print("starting app")
    app.run(port=os.environ.get("PORT", 6969), debug=True)
