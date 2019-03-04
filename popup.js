// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

let saveButton = document.getElementById('save')
let input = document.getElementById('token')
let msg = document.getElementById('msg')

saveButton.onclick = (e) => {
  console.log(input.value)
  chrome.storage.sync.set({save: input.value}, function(data) {})
  msg.style.display = 'block'
  setTimeout(()=> {
    msg.style.display = 'none'
  }, 2000)
}
