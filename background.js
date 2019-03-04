// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    let API_KEY = ''

    chrome.storage.sync.get(['save'], function(result) {
      API_KEY = result.save
    })

    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'Referer' && details.requestHeaders[i].value.includes('oload') || details.requestHeaders[i].value.includes('openload')) {
        const body = new URLSearchParams()
        body.append('link', details.requestHeaders[i].value)
        fetch('https://api.real-debrid.com/rest/1.0/unrestrict/check', {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization" : "Bearer " + API_KEY
        },
        method:"POST",
        body: body
        }).then(res => {
          return res.json()
        }).then(data => {
          if (data.supported) {
            fetch('https://api.real-debrid.com/rest/1.0/unrestrict/link', {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization" : "Bearer " + API_KEY
        },
        method:"POST",
        body: body
        }).then(res => {
          return res.json()
        }).then(data => {
          if (data.download) {
            alert(`link here: ${data.download}`)
          }
        })
          }
        }).catch(err => {
          console.log(err)
        })
        break
      }
    }
  },
  {urls: ["https://oload.stream/*", "https://1fiagej.oloadcdn.net/*", "https://openload.co/*"],
  types: ["media"]},
  ["requestHeaders"])

