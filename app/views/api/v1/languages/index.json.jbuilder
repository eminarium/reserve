json.array! @languages do |language|
    json.(
        language, 
            :id, 
            :title, 
            :notes, 
            :created_at, 
            :updated_at
    )
end