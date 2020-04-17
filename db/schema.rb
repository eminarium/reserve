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

ActiveRecord::Schema.define(version: 2020_04_14_142553) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applicants", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "patronymic"
    t.string "home_phone"
    t.string "mobile_phone"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.integer "school_grade"
    t.integer "age"
    t.index ["first_name"], name: "index_applicants_on_first_name"
    t.index ["home_phone"], name: "index_applicants_on_home_phone"
    t.index ["last_name"], name: "index_applicants_on_last_name"
    t.index ["mobile_phone"], name: "index_applicants_on_mobile_phone"
    t.index ["patronymic"], name: "index_applicants_on_patronymic"
    t.index ["user_id"], name: "index_applicants_on_user_id"
  end

  create_table "jwt_blacklists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_blacklists_on_jti"
  end

  create_table "languages", force: :cascade do |t|
    t.string "title"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_languages_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "applicant_id"
    t.bigint "season_id"
    t.bigint "shift_id"
    t.bigint "subject_id"
    t.boolean "is_registered"
    t.boolean "is_sms_sent"
    t.boolean "is_called"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["applicant_id"], name: "index_reservations_on_applicant_id"
    t.index ["season_id"], name: "index_reservations_on_season_id"
    t.index ["shift_id"], name: "index_reservations_on_shift_id"
    t.index ["subject_id"], name: "index_reservations_on_subject_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.string "title"
    t.integer "order_no"
    t.date "start_date"
    t.date "end_date"
    t.date "return_deadline"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["order_no"], name: "index_seasons_on_order_no", unique: true
    t.index ["user_id"], name: "index_seasons_on_user_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.string "title"
    t.text "notes"
    t.time "start_time"
    t.time "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_shifts_on_user_id"
  end

  create_table "subject_categories", force: :cascade do |t|
    t.string "title"
    t.text "notes"
    t.boolean "is_kids"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_subject_categories_on_user_id"
  end

  create_table "subject_tests", force: :cascade do |t|
    t.bigint "applicant_id"
    t.bigint "subject_id"
    t.bigint "season_id"
    t.float "result"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["applicant_id"], name: "index_subject_tests_on_applicant_id"
    t.index ["season_id"], name: "index_subject_tests_on_season_id"
    t.index ["subject_id"], name: "index_subject_tests_on_subject_id"
    t.index ["user_id"], name: "index_subject_tests_on_user_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "title"
    t.integer "level"
    t.text "notes"
    t.bigint "subject_category_id"
    t.bigint "language_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.float "passing_points"
    t.index ["language_id"], name: "index_subjects_on_language_id"
    t.index ["subject_category_id"], name: "index_subjects_on_subject_category_id"
    t.index ["user_id"], name: "index_subjects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role"
    t.string "email", default: ""
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "applicants", "users"
  add_foreign_key "languages", "users"
  add_foreign_key "reservations", "applicants"
  add_foreign_key "reservations", "seasons"
  add_foreign_key "reservations", "shifts"
  add_foreign_key "reservations", "subjects"
  add_foreign_key "reservations", "users"
  add_foreign_key "seasons", "users"
  add_foreign_key "shifts", "users"
  add_foreign_key "subject_categories", "users"
  add_foreign_key "subject_tests", "applicants"
  add_foreign_key "subject_tests", "seasons"
  add_foreign_key "subject_tests", "subjects"
  add_foreign_key "subject_tests", "users"
  add_foreign_key "subjects", "languages"
  add_foreign_key "subjects", "subject_categories"
  add_foreign_key "subjects", "users"
end
