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

ActiveRecord::Schema.define(version: 2020_04_02_065211) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applicants", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "patronymic"
    t.string "home_phone"
    t.string "mobile_phone"
    t.string "photo_url"
    t.date "birth_date"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["first_name"], name: "index_applicants_on_first_name"
    t.index ["home_phone"], name: "index_applicants_on_home_phone"
    t.index ["last_name"], name: "index_applicants_on_last_name"
    t.index ["mobile_phone"], name: "index_applicants_on_mobile_phone"
    t.index ["patronymic"], name: "index_applicants_on_patronymic"
  end

  create_table "subject_categories", force: :cascade do |t|
    t.string "title"
    t.text "notes"
    t.boolean "is_kids"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
