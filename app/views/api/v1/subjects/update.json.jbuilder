json.(
    @subject, 
        :id, 
        :title, 
        :level,
        :subject_category_id,
        :language_id,
        :passing_points,
        :notes, 
        :created_at, 
        :updated_at,
)

json.subject_category {
    json.id             @subject.subject_category.id
    json.title          @subject.subject_category.title
    json.is_kids        @subject.subject_category.is_kids
    json.notes          @subject.subject_category.notes
    json.created_at     @subject.subject_category.created_at
    json.updated_at     @subject.subject_category.updated_at     
}

json.language {
    json.id             @subject.language.id
    json.title          @subject.language.title
    json.notes          @subject.language.notes
    json.created_at     @subject.language.created_at
    json.updated_at     @subject.language.updated_at
}