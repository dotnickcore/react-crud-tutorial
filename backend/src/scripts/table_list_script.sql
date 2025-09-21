SELECT 
    p.id, 
    p.name AS player_name, 
    t.name AS team_name,
    pos.name AS position_name,
    p.contractValue,
    p.contractYears,
    p.isActive
FROM players p
LEFT JOIN teams t ON p.team_id = t.id
LEFT JOIN positions pos ON p.position_id = pos.id;

