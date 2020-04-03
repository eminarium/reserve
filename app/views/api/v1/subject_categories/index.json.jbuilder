json.array! @subject_categories do |subject_category|
    json.(
        subject_category, 
            :id, 
            :title, 
            :notes, 
            :is_kids,
            :created_at, 
            :updated_at
    )
end