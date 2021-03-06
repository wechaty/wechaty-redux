/**
 *   Wechaty Open Source Software - https://github.com/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import { createReducer, ActionType } from 'typesafe-actions'
import { DeepReadonly } from 'utility-types'

import { ContactPayload } from 'wechaty-puppet'

import * as actions from './actions'

const initialState: DeepReadonly<{
  [wechatyId: string]: undefined | {  // wechaty id
    qrcode? : string,
    user?   : ContactPayload,
  }
}> = {}

const reducer = createReducer<typeof initialState, ActionType<typeof actions>>(initialState)
  .handleAction(actions.scanEvent, (state, action) => ({
    ...state,
    [action.payload.wechatyId]: {
      ...state[action.payload.wechatyId],
      qrcode: action.payload.qrcode,
      user: undefined,
    },
  }))
  .handleAction(actions.saveUser, (state, action) => ({
    ...state,
    [action.payload.wechatyId]: {
      ...state[action.payload.wechatyId],
      qrcode: undefined,
      user: action.payload,
    },
  }))
  .handleAction(actions.logoutEvent, (state, action) => ({
    ...state,
    [action.payload.wechatyId]: undefined,
  }))

export type State = ReturnType<typeof reducer>
export default reducer
