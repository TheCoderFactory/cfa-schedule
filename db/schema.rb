# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160311042731) do

  create_table "event_intakes", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "intake_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "event_intakes", ["event_id"], name: "index_event_intakes_on_event_id"
  add_index "event_intakes", ["intake_id"], name: "index_event_intakes_on_intake_id"

  create_table "event_times", force: :cascade do |t|
    t.integer  "event_id"
    t.date     "date"
    t.time     "start_time"
    t.time     "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "event_times", ["event_id"], name: "index_event_times_on_event_id"

  create_table "event_types", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "icon"
    t.string   "color"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "event_type_id"
    t.string   "name"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "events", ["event_type_id"], name: "index_events_on_event_type_id"
  add_index "events", ["user_id"], name: "index_events_on_user_id"

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "intakes", force: :cascade do |t|
    t.string   "name"
    t.date     "term_one_start"
    t.date     "term_one_end"
    t.date     "term_two_start"
    t.date     "term_two_end"
    t.date     "term_three_start"
    t.date     "term_three_end"
    t.date     "term_four_start"
    t.date     "term_four_end"
    t.string   "color"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], name: "index_roles_on_name"

  create_table "teachers", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "image"
    t.text     "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "teachers", ["user_id"], name: "index_teachers_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"

end
