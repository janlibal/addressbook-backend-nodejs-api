import { Model } from '../index'
import _ from 'lodash'

let updatedAt: Date
let createdAt: Date

class Base extends Model {
    $beforeInsert() {
      updatedAt = createdAt = createdAt || new Date()
    }
}

export default Base
